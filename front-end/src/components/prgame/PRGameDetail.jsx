import styled from 'styled-components';
import field from '../../img/field.png';
import { useEffect, useState } from 'react';
import playerIcon from '../../img/player.png';
import grayUniformIcon from '../../img/grayUniform.png';
import uniformIcon from '../../img/uniform.png';
import { useNavigate } from 'react-router-dom';

const PRGameUpdatePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8vh;
`;

/* ───── 새 캡슐 버튼 ───── */
const ChangeButton = styled.button`
  width: 40vh;
  height: 5.5vh;
  border-radius: 3vh;
  font-size: 1.8vh;
  font-weight: 600;
  background-color: ${({ variant }) =>
    variant === 'primary' ? '#00C851' : '#000'};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6vh;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.15s, background-color 0.15s;
  margin-bottom: 2vh;

  &:hover {
    background-color: ${({ variant }) =>
      variant === 'primary' ? '#00b44b' : '#222'};
    transform: translateY(-0.3vh) scale(1.05);
    cursor: pointer;
  }
  &:active {
    transform: scale(0.95);
  }
  &:disabled {
    background-color: #999;
    cursor: not-allowed;
    transform: none;
  }
`;

const PRGameDetail = ({
  prGameId,
  setUpdate,
  setSelectedPositionKey,
  setIsOpen,
  prGame,
  game,
  setGame,
  getPRCount,
  users,
  positionList,
}) => {
  const gameId = sessionStorage.getItem('gameId');
  const userMail = sessionStorage.getItem('userMail');
  const [team, setTeam] = useState('');
  const count = getPRCount();
  const navigate = useNavigate();

  /* 초기 포메이션 세팅 */
  useEffect(() => {
    if (!prGame) return; // prGame 없으면 실행 안 함
    const resetFormation = () => {
      positionList.forEach(({ key }) =>
        setGame((prev) => ({ ...(prev || {}), [key]: prGame[key] })),
      );
    };
    resetFormation();
  }, [prGame]);

  useEffect(() => {
    const fetchTeam = async () => {
      const gameRes = await fetch(
        `http://52.78.12.127:8080/api/games/game/${gameId}`,
      );
      const gameData = await gameRes.json();

      const teamRes = await fetch(
        `http://52.78.12.127:8080/api/teams/${gameData.teamId}`,
      );
      const teamData = await teamRes.json();
      setTeam(teamData);
    };

    fetchTeam();
  }, [gameId]);

  const handleMergeFormation = async () => {
    try {
      const res = await fetch(
        `http://52.78.12.127:8080/api/quarters/change-from-pr-to-game`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prGameId: prGameId,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        alert(`변환 실패: ${data.message || '서버 오류'}`);
      } else {
        alert('PR 포메이션이 실제 경기 포지션으로 적용되었습니다.');
        navigate(`/game/${gameId}`);
      }
    } catch (error) {
      console.error('예외 발생:', error);
      alert('요청 중 문제가 발생했습니다.');
    }
  };

  const isManager = team.teamManagerMail == userMail;

  if (!prGame || !game) return <div>로딩 중...</div>;

  return (
    <PRGameUpdatePageContainer>
      <h1>{prGame.prGameName}</h1>
      <h2>
        Starting&nbsp;: {users.length} |{' '}
        <span className="text-green-500">Lineup: {count}</span>
      </h2>

      <div
        className="relative w-[49vh] h-[42vh] mb-[4vh]"
        style={{
          backgroundImage: `url(${field})`,
          backgroundSize: '100% 100%',
        }}
      >
        <div className="absolute w-full h-full">
          {positionList.map(({ key, label, top, left }) => {
            const player = prGame[key] ? prGame[key] : null;

            return player ? (
              <div key={key}>
                <div
                  className="absolute flex flex-col items-center"
                  style={{ top, left, transform: 'translateX(-0%)' }}
                >
                  <img
                    src={
                      prGame?.[key]
                        ? !team?.users?.some(
                            (u) => u.userMail === prGame[key]?.userMail,
                          )
                          ? grayUniformIcon
                          : uniformIcon
                        : playerIcon
                    }
                    alt="player"
                    className="w-[4.5vh] h-[4.5vh] object-contain"
                  />
                  <span className="text-white font-bold text-[1.8vh] whitespace-nowrap drop-shadow-[0_0_0.6vh_black] mt-[-2vh] max-w-[7vh] overflow-hidden text-ellipsis">
                    {prGame?.[key]?.userName || label}
                  </span>
                </div>
              </div>
            ) : null;
          })}
        </div>
      </div>

      <ChangeButton variant="primary" onClick={() => setUpdate(true)}>
        ♻️&nbsp;포메이션&nbsp;수정
      </ChangeButton>
      {isManager && (
        <ChangeButton variant="primary" onClick={() => handleMergeFormation()}>
          포메이션 병합
        </ChangeButton>
      )}
    </PRGameUpdatePageContainer>
  );
};

export default PRGameDetail;

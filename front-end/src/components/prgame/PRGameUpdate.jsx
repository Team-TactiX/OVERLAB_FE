import styled from 'styled-components';
import field from '../../img/field.png';
import { useEffect, useState } from 'react';
import playerIcon from '../../img/player.png';
import grayUniformIcon from '../../img/grayUniform.png';
import uniformIcon from '../../img/uniform.png';
import { useParams } from 'react-router-dom';

const PRGameUpdatePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8vh;
`;

const TitleInput = styled.input`
  width: 60%;
  height: 4vh;
  margin: 2vh auto;
  text-align: center;
  font-size: 2.5vh;
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

const PRGameUpdate = ({
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
  const [title, setTitle] = useState(prGame.prGameName);
  console.log(prGame);

  /* 초기 포메이션 세팅 */
  useEffect(() => {
    const resetFormation = () => {
      positionList.forEach(({ key }) =>
        setGame((prev) => ({ ...prev, [key]: prGame[key] })),
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

  const handlePositionClick = (posKey) => {
    setSelectedPositionKey(posKey);
    setIsOpen(true);
  };

  const handleRequestPRGame = async () => {
    if (!prGame) return;

    const payload = {
      prGameId,
      prGameName: title,
      quarter: { quarterId: Number(prGame.quarter.quarterId) },
      userMail,
    };

    positionList.forEach(({ key }) => {
      const u = prGame[key];
      if (u?.userMail) payload[key] = { userMail: u.userMail };
    });

    console.log(payload);
    try {
      const res = await fetch('http://52.78.12.127:8080/api/pr-games/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(`요청 실패: ${data.message || '서버 오류'}`);
      } else {
        alert('PR 경기가 성공적으로 저장되었습니다.');
        setUpdate(false);
      }
    } catch (e) {
      console.error(e);
      alert('요청 중 예외가 발생했습니다.');
    }
  };

  if (!game) return <div>로딩 중...</div>;

  return (
    <PRGameUpdatePageContainer>
      <TitleInput
        value={title}
        placeholder="제목을 입력하세요"
        onChange={(e) => setTitle(e.target.value)}
      />
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
          {positionList.map(({ key, label, top, left }) => (
            <button key={key} onClick={() => handlePositionClick(key)}>
              {/* 아이콘+이름 래퍼 하나만 absolute */}
              <div
                className="absolute flex flex-col items-center"
                style={{ top, left, transform: 'translateX(-0%)' }}
              >
                <img
                  src={
                    game[key]
                      ? !team?.users?.some(
                          (u) => u.userMail === game[key].userMail,
                        )
                        ? grayUniformIcon
                        : uniformIcon
                      : playerIcon
                  }
                  alt="player"
                  className="w-[4.5vh] h-[4.5vh] object-contain"
                />
                <span className="text-white font-bold text-[1.8vh] whitespace-nowrap drop-shadow-[0_0_0.6vh_black] mt-[-2vh] max-w-[7vh] overflow-hidden text-ellipsis">
                  {game[key] ? game[key].userName : label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <ChangeButton variant="primary" onClick={handleRequestPRGame}>
        ♻️&nbsp;포메이션&nbsp;수정 완료
      </ChangeButton>
    </PRGameUpdatePageContainer>
  );
};

export default PRGameUpdate;

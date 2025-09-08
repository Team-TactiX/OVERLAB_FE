import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import field from '../../img/field.png';
import playerIcon from '../../img/player.png';
import grayUniformIcon from '../../img/grayUniform.png';
import uniformIcon from '../../img/uniform.png';

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

  useEffect(() => {
    if (!prGame) return;
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
    <div className="flex flex-col items-center pt-20">
      <h1>{prGame.prGameName}</h1>
      <h2>
        Starting&nbsp;: {users.length} |{' '}
        <span className="text-green-500">Lineup: {count}</span>
      </h2>

      <div
        className="relative w-[49vh] h-[42vh] mb-[4vh] bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${field})` }}
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

      {/* ChangeButton 스타일 적용 */}
      <button
        className={`
          w-[40vh] h-[5.5vh] rounded-[3vh] text-[1.8vh] font-semibold
          flex items-center justify-center gap-[0.6vh]
          shadow-md transition-all duration-150 ease-in-out
          active:scale-95
          disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none
          ${
            isManager
              ? 'bg-green-500 text-white hover:bg-green-600 hover:-translate-y-0.5 hover:scale-105'
              : 'bg-black text-white hover:bg-gray-800 hover:-translate-y-0.5 hover:scale-105'
          }
        `}
        onClick={() => setUpdate(true)}
      >
        ♻️&nbsp;포메이션&nbsp;수정
      </button>

      {isManager && (
        <button
          className="w-[40vh] h-[5.5vh] rounded-[3vh] text-[1.8vh] font-semibold
            flex items-center justify-center gap-[0.6vh]
            shadow-md transition-all duration-150 ease-in-out
            bg-green-500 text-white hover:bg-green-600 hover:-translate-y-0.5 hover:scale-105
            active:scale-95
            disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
          onClick={() => handleMergeFormation()}
        >
          포메이션 병합
        </button>
      )}
    </div>
  );
};

export default PRGameDetail;

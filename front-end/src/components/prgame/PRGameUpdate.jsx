import { useEffect, useState } from 'react';
import field from '../../img/field.png';
import playerIcon from '../../img/player.png';
import grayUniformIcon from '../../img/grayUniform.png';
import uniformIcon from '../../img/uniform.png';

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
    // PRGameUpdatePageContainer 스타일 적용
    <div className="flex flex-col items-center pt-[8vh]">
      {/* TitleInput 스타일 적용 */}
      <input
        type="text"
        className="w-3/5 h-[4vh] mx-auto my-[2vh] text-center text-[2.5vh] border"
        value={title}
        placeholder="제목을 입력하세요"
        onChange={(e) => setTitle(e.target.value)}
      />
      <h2>
        Starting&nbsp;: {users.length} |{' '}
        <span className="text-green-500">Lineup: {count}</span>
      </h2>

      <div
        className="relative w-[49vh] h-[42vh] mb-[4vh] bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${field})` }}
      >
        <div className="absolute w-full h-full">
          {positionList.map(({ key, label, top, left }) => (
            <button key={key} onClick={() => handlePositionClick(key)}>
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

      {/* ChangeButton 스타일 적용 */}
      <button
        onClick={handleRequestPRGame}
        className={`
          w-[40vh] h-[5.5vh] rounded-[3vh] text-[1.8vh] font-semibold
          flex items-center justify-center gap-[0.6vh]
          shadow-md transition-all duration-150 ease-in-out
          active:scale-95
          disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none
          bg-green-500 text-white hover:bg-green-600 hover:-translate-y-0.5 hover:scale-105
        `}
      >
        ♻️&nbsp;포메이션&nbsp;수정 완료
      </button>
    </div>
  );
};

export default PRGameUpdate;

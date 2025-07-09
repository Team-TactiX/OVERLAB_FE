import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import field from '../../img/field.png';
import playerIcon from '../../img/player.png';
import GameJoin from './GameJoin';
import GameDelete from './GameDelete';

const GameInfo = ({ setUpdate, game, setGame, users, teamId, positionList, getCount }) => {
  const { gameId } = useParams();
  const [hasPermission, setHasPermission] = useState(false);
  const [checked, setChecked] = useState(false);
  const userMail = sessionStorage.getItem('userMail');
  sessionStorage.setItem('teamId', teamId);
  const count = getCount();

  useEffect(() => {
    const checkPermission = async () => {
      if (!userMail || !teamId) return;
      try {
        const response = await fetch(`http://52.78.12.127:8080/api/teams/${teamId}`);
        const data = await response.json();
        if (data.teamManager.userMail === userMail) {
          setHasPermission(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setChecked(true);
      }
    };
    checkPermission();
  }, [userMail, teamId]);

  const handleRemovePosition = async () => {
    try {
      const updated = Object.fromEntries(
        Object.entries(game).map(([key, value]) =>
          value?.userMail === userMail ? [key, null] : [key, value],
        )
      );

      const response = await fetch('http://52.78.12.127:8080/api/games/update-game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (!response.ok) alert(await response.text());
    } catch (err) {
      console.error(err);
      alert('포메이션 제거 중 오류');
    }
  };

  if (!checked) return <div className="text-center pt-[10vh]">권한 확인 중...</div>;

  return (
    <div className="min-h-[100vh] w-full bg-[#f9f9f9] flex justify-center py-[10vh]">
      <div className="w-[100%] max-w-[60vh] bg-white rounded-xl p-[3vh_3vw] shadow-lg animate-fadeUp">
        <div className="flex flex-col items-center animate-fadeIn">

          {/* 날짜 + VS 상대팀 */}
          <span className="text-[1.5vh] text-gray-400 mb-[0.5vh]">경기 일정</span>
          <h2 className="text-[2.6vh] font-extrabold text-[#2c3e50] mb-[1vh]">
            {game.date.slice(0, 10)} VS {game.versus}
          </h2>

          {/* 인원 */}
          <div className="flex gap-[1.5vh] items-center text-[1.6vh] font-semibold mb-[2vh]">
            <span className="text-gray-500">Starting: {users.length}</span>
            <span className="text-green-500">Lineup: {count}</span>
          </div>

          {/* 필드 */}
          <div
            className="relative w-[49vh] h-[42vh] mb-[4vh]"
            style={{ backgroundImage: `url(${field})`, backgroundSize: '100% 100%' }}
          >
            <div className="absolute w-full h-full">
              {positionList.map(({ key, top, left }) =>
                game[key] ? (
                  <div key={key}>
                    <div
                      className="absolute flex items-center justify-center"
                      style={{ top: top, left: left }}
                    >
                      <img src={playerIcon} alt="player" className="w-[4.5vh] h-[4.5vh] object-contain" />
                    </div>
                    <span
                      className="absolute text-white font-bold text-[1.8vh] whitespace-nowrap drop-shadow-[0_0_0.6vh_black]"
                      style={{
                        top: key === 'gkId' ? `calc(${top} + 2vh)` : `calc(${top} + 2.5vh)`,
                        left: left,
                      }}
                    >
                      {game[key].userName}
                    </span>
                  </div>
                ) : null
              )}
            </div>
          </div>

          {/* 팀명 / 매니저명 + 톱니바퀴 (한 줄, 좌측 정렬) */}
          <div className="w-full flex justify-between items-center px-[1vh] mb-[1.5vh]">
            <div className="flex flex-col">
              <div className="text-[2vh] font-bold text-[#2c3e50]">{game.team?.teamName}</div>
              <div className="text-[1.6vh] text-gray-600">매니저: {game.team?.teamManager?.userName}</div>
            </div>
            {hasPermission && (
              <button
                onClick={() => setUpdate(true)}
                className="text-gray-600 hover:text-black text-[2.2vh]"
                title="경기 수정"
              >
                ⚙️
              </button>
            )}
          </div>

          {/* 참가/취소 버튼 */}
          <div className="flex flex-col gap-[1.5vh] items-center w-full">
            <GameJoin
              game={game}
              setGame={setGame}
              userMail={userMail}
              users={users}
              gameId={gameId}
              hasPermission={hasPermission}
              handleRemovePosition={handleRemovePosition}
              positionList={positionList}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import field from '../../img/field.png';
import playerIcon from '../../img/player.png';
import useGameData from '../../hooks/useGameData';
import GameJoin from './GameJoin';
import GameDelete from './GameDelete';

const GameInfo = ({ setUpdate }) => {
  const { gameId } = useParams();
  const { game, users, teamId } = useGameData();
  const [hasPermission, setHasPermission] = useState(false);
  const [checked, setChecked] = useState(false);
  const userMail = sessionStorage.getItem('userMail');
  sessionStorage.setItem('teamId', teamId);

  const positionList = [
    { key: 'stId', top: '1vh', left: '22.3vh' },
    { key: 'lsId', top: '3vh', left: '11.6vh' },
    { key: 'rsId', top: '3vh', left: '29vh' },
    { key: 'lwId', top: '6vh', left: '3.6vh' },
    { key: 'cfId', top: '6vh', left: '22.3vh' },
    { key: 'rwId', top: '6vh', left: '37.6vh' },
    { key: 'lamId', top: '12vh', left: '11.6vh' },
    { key: 'camId', top: '12vh', left: '22.3vh' },
    { key: 'ramId', top: '12vh', left: '29vh' },
    { key: 'lmId', top: '18vh', left: '3vh' },
    { key: 'lcmId', top: '18vh', left: '11.6vh' },
    { key: 'cmId', top: '18vh', left: '22.3vh' },
    { key: 'rcmId', top: '18vh', left: '29vh' },
    { key: 'rmId', top: '18vh', left: '37.6vh' },
    { key: 'lwbId', top: '24vh', left: '3vh' },
    { key: 'ldmId', top: '24vh', left: '11.6vh' },
    { key: 'cdmId', top: '24vh', left: '22.3vh' },
    { key: 'rdmId', top: '24vh', left: '29vh' },
    { key: 'rwbId', top: '24vh', left: '37.6vh' },
    { key: 'lbId', top: '30vh', left: '3vh' },
    { key: 'lcbId', top: '30vh', left: '11.6vh' },
    { key: 'swId', top: '30vh', left: '22.3vh' },
    { key: 'rcbId', top: '30vh', left: '29vh' },
    { key: 'rbId', top: '30vh', left: '37.6vh' },
    { key: 'gkId', top: '36vh', left: '22.3vh' },
  ];

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
          <span className="text-[1.5vh] text-gray-400 mb-[0.5vh]">경기 일정</span>
          <h2 className="text-[2.6vh] font-extrabold text-[#2c3e50] mb-[1vh]">{game.date.slice(0, 10)}</h2>
          <h2 className="text-[2.4vh] font-extrabold text-[#2c3e50] mb-[3vh] tracking-wide">
  <div className="relative inline-flex items-center px-[1.2vh] py-[0.4vh] bg-[#ecf0f1] rounded-[1vh] shadow-md hover:bg-[#dfe6e9] transition">
    <span className="text-[#2c3e50]">{game.gameName}</span>
    <span className="absolute top-[-0.5vh] right-[-0.5vh] w-[0.8vh] h-[0.8vh] bg-[#00b894] rounded-full shadow-sm"></span>
  </div>
</h2>

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

          <div className="flex flex-col gap-[1.5vh] items-center w-full">
            <GameJoin
              userMail={userMail}
              users={users}
              gameId={gameId}
              hasPermission={hasPermission}
              handleRemovePosition={handleRemovePosition}
            />
            {hasPermission && (
              <>
                <button 
                  onClick={() => setUpdate(true)}
                  className="flex items-center rounded-full bg-[#00b894] text-white px-[1vh] py-[0.8vh] hover:bg-[#00a57a] active:scale-95 w-full justify-center transition"
                >
                  수정
                </button>
                <GameDelete gameId={gameId} teamId={teamId} />
                <Link to={`/pr/list/${gameId}`} className="w-full">
                  <button className="flex items-center rounded-full bg-[#00b894] text-white px-[1vh] py-[0.8vh] hover:bg-[#00a57a] active:scale-95 w-full justify-center transition">
                    요청 확인
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;

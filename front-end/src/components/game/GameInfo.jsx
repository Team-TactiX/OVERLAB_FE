import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GameJoin from './GameJoin';
import GameFormation from './GameFormation';

const GameInfo = ({
  setUpdate,
  game,
  setGame,
  users,
  setUsers,
  positionList,
  quarters,
  setQuarters,
  selectedQuarter,
  setSelectedQuarter,
  currentQuarter,
  setCurrentQuarter,
  currentQuarterIndex,
  getCount,
}) => {
  const { gameId } = useParams();
  const [hasPermission, setHasPermission] = useState(false);
  const [checked, setChecked] = useState(false);
  const [team, setTeam] = useState('');
  const [teamManager, setTeamManager] = useState('');
  const userId = sessionStorage.getItem('userId');
  const userMail = sessionStorage.getItem('userMail');
  sessionStorage.setItem('gameId', gameId);

  useEffect(() => {
    const checkPermission = async () => {
      if (!userMail || !game.teamId) return;
      try {
        const response = await fetch(
          `http://52.78.12.127:8080/api/teams/${game.teamId}`,
        );
        const data = await response.json();
        setTeam(data);
      } catch (err) {
        console.error(err);
      } finally {
        setChecked(true);
      }
    };

    checkPermission();
  }, [userMail, game.teamId]);

  useEffect(() => {
    const fetchTeamManager = async () => {
      if (!team) return;

      try {
        const response = await fetch(
          `http://52.78.12.127:8080/api/users/check/id/${team.teamManagerId}`,
        );
        const data = await response.json();
        setTeamManager(data);
        if (data.userId == userId) {
          setHasPermission(true);
        }
      } catch (err) {
        alert('서버 오류 발생');
        console.error(err);
      }
    };

    fetchTeamManager();
  }, [team]);

  const handleRemovePosition = async () => {
    try {
      const updated = Object.fromEntries(
        Object.entries(game).map(([key, value]) =>
          value?.userMail === userMail ? [key, null] : [key, value],
        ),
      );

      const response = await fetch(
        'http://52.78.12.127:8080/api/games/update-game',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated),
        },
      );
      if (!response.ok) alert(await response.text());
    } catch (err) {
      console.error(err);
      alert('포메이션 제거 중 오류');
    }
  };

  if (!checked)
    return <div className="text-center pt-[10vh]">권한 확인 중...</div>;

  return (
    <div className="min-h-[100vh] w-full bg-[#f9f9f9] flex justify-center py-[10vh]">
      <div className="w-[100%] max-w-[60vh] bg-f9f9f9 rounded-xl p-[3vh_3vw] shadow-lg animate-fadeUp">
        <div className="flex flex-col items-center animate-fadeIn">
          {/* 날짜 + VS 상대팀 */}
          <span className="text-[1.5vh] text-gray-400 mb-[0.5vh]">
            경기 일정
          </span>
          <h2 className="text-[2.6vh] font-extrabold text-[#2c3e50] mb-[1vh] text-center">
            {game.date.slice(0, 10)}
            <br />
            {team.teamName} VS {game.versus}
          </h2>

          {/* 필드 */}
          <GameFormation
            positionList={positionList}
            selectedQuarter={selectedQuarter}
            setSelectedQuarter={setSelectedQuarter}
            quarters={quarters}
            currentQuarter={currentQuarter}
            setCurrentQuarter={setCurrentQuarter}
            currentQuarterIndex={currentQuarterIndex}
            users={users}
            setUsers={setUsers}
            getCount={getCount}
          />

          {/* 팀명 / 매니저명 + 톱니바퀴 (한 줄, 좌측 정렬) */}
          <div className="w-full flex justify-between items-center px-[1vh] mb-[1.5vh]">
            <div className="flex flex-col">
              <div className="text-[2vh] font-bold text-[#2c3e50]">
                {team?.teamName}
              </div>
              <div className="text-[1.6vh] text-gray-600">
                매니저 : {teamManager.userName}
              </div>
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
              currentQuarter={currentQuarter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;

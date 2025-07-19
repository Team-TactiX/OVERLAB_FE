import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import GameDelete from './GameDelete';
import GameUpdateFormation from './GameUpdataFormation';
import QuarterDelete from './QuarterDelete';

const GameUpdate = ({
  setUpdate,
  setSelectedPositionKey,
  setIsOpen,
  game,
  setGame,
  positionList,
  getCount,
  users,
  currentQuarter,
  setCurrentQuarter,
  quarters,
  selectedQuarter,
  setSelectedQuarter,
  currentQuarterIndex,
}) => {
  const { gameId } = useParams();
  const [teamManager, setTeamManager] = useState('');
  const [team, setTeam] = useState('');

  useEffect(() => {
    const fetchGame = async () => {
      const res = await fetch(
        `http://52.78.12.127:8080/api/games/game/${gameId}`,
      );
      const data = await res.json();
      setGame(data);
    };
    fetchGame();
  }, [gameId]);

  useEffect(() => {
    const fetchTeamManager = async () => {
      try {
        const response = await fetch(
          `http://52.78.12.127:8080/api/teams/${game.teamId}`,
        );
        const data = await response.json();
        setTeam(data);
        const res = await fetch(
          `http://52.78.12.127:8080/api/users/check/id/${data.teamManagerId}`,
        );
        const d = await res.json();
        setTeamManager(d);
      } catch (err) {
        alert('서버 오류 발생');
        console.error(err);
      }
    };

    fetchTeamManager();
  }, [game]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        'http://52.78.12.127:8080/api/quarters/update-quarter',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentQuarter),
        },
      );

      if (response.ok) {
        alert('포지션이 저장되었습니다.');
        setUpdate(false);
      } else {
        alert('저장 실패: ' + (await response.text()));
      }
    } catch (err) {
      console.error(err);
      alert('서버 오류 발생');
    }
  };

  const insertQuarter = async () => {
    try {
      const response = await fetch(
        `http://52.78.12.127:8080/api/quarters/create-quarter`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            quarterOrdinalNum: quarters.length + 1,
            gameId: gameId,
          }),
        },
      );
      if (response.ok) {
        alert('쿼터 추가 성공');
        window.location.reload();
      } else {
        const errorText = await response.text();
        console.error(errorText);
        console.error(response.status);
        alert('쿼터 추가 실패');
      }
    } catch (err) {
      alert('서버 오류 발생');
      console.error(err);
    }
  };

  if (!game) return <div className="text-center mt-10">로딩 중...</div>;

  return (
    <div className="px-[2vw] py-[15vh] max-w-[768px] mx-auto bg-[#f9f9f9] flex flex-col items-center">
      {/* 상단: 날짜 및 VS 정보 */}
      <h2 className="text-[2.4vh] font-bold mb-[1.2vh]">
        {game.date.slice(0, 10)} VS {game.versus}
      </h2>

      <GameUpdateFormation
        users={users}
        setSelectedPositionKey={setSelectedPositionKey}
        setIsOpen={setIsOpen}
        getCount={getCount}
        positionList={positionList}
        game={game}
        quarters={quarters}
        selectedQuarter={selectedQuarter}
        setSelectedQuarter={setSelectedQuarter}
        currentQuarter={currentQuarter}
        setCurrentQuarter={setCurrentQuarter}
        team={team}
      />

      <div className="w-full max-w-[360px] mb-[2.5vh]">
        <div className="text-[2vh] font-bold text-[#2c3e50] text-left">
          {team.teamName}
        </div>
        <div className="text-[1.6vh] text-gray-500 mt-[0.2vh] text-left">
          매니저 : {teamManager.userName}
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="w-full flex flex-col items-center gap-[1.2vh]">
        {/* 저장 + 요청 확인 */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-[360px]">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white font-semibold py-[1.2vh] rounded-full hover:bg-green-600 transition-all"
          >
            💾 저장
          </button>
          <Link to={`/pr/list/${currentQuarter.quarterId}`} className="w-full">
            <button className="w-full border-2 border-green-500 text-green-600 font-semibold py-[1.2vh] rounded-full hover:bg-green-50">
              📋 요청 확인
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full max-w-[360px]">
          {/* 삭제 버튼 */}
          <button
            onClick={() => insertQuarter()}
            className="w-full max-w-[360px] bg-green-100 text-green-600 font-semibold py-[1.2vh] rounded-full hover:bg-green-200"
          >
            쿼터 추가
          </button>
          <QuarterDelete quarterId={currentQuarter.quarterId} />
        </div>
        <GameDelete gameId={gameId} teamId={team.teamId} />
      </div>
    </div>
  );
};

export default GameUpdate;

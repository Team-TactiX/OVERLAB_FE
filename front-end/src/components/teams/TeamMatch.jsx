import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import altImage from '../../img/alt_image.png';

const TeamMatch = ({ games, teamManagerMail }) => {
  const userMail = sessionStorage.getItem('userMail');
  const teamId = sessionStorage.getItem('teamId');

  const handleLeave = async () => {
    try {
      const res = await fetch(`http://52.78.12.127:8080/api/teams/${teamId}/remove-user`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMail }),
      });
      if (res.ok) {
        alert('팀 탈퇴 완료');
        sessionStorage.removeItem('teamId');
        window.location.reload();
      } else {
        alert(`탈퇴 실패: ${await res.text()}`);
      }
    } catch (err) {
      console.error(err);
      alert('서버 오류');
    }
  };

  const sortedGames = [...games].sort((a, b) =>
    dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <span className="text-red-500 text-xl"></span>
      </h2>

      {games.length === 0 ? (
        <div className="text-center text-gray-500 text-sm">예정된 경기가 없습니다.</div>
      ) : (
        sortedGames.map((game) => (
          <Link
            key={game.gameId}
            to={`/game/${game.gameId}`}
            className="flex flex-col bg-blue-50 hover:bg-blue-100 transition p-4 rounded-xl shadow-sm"
          >
            <div className="text-center text-blue-900 font-medium text-sm mb-2">
              {game.gameName}
            </div>

            <div className="flex items-center justify-between">
              {/* 홈 팀 */}
              <div className="flex flex-col items-center w-1/4">
                <img
                  src={`http://52.78.12.127:8080/logos/${game.team.logo}`}
                  onError={(e) => (e.target.src = altImage)}
                  alt="home"
                  className="w-14 h-14 rounded-full object-cover mb-1 border border-gray-300"
                />
                <span className="text-xs font-medium text-gray-700 text-center">{game.team.teamName}</span>
              </div>

              {/* 경기 정보 */}
              <div className="flex flex-col items-center w-1/2 text-center">
                <span className="text-xs text-gray-500 mb-1">{dayjs(game.date).format('YYYY.MM.DD HH:mm')}</span>
                <span className="text-2xl font-bold text-blue-800">VS</span>
              </div>

              {/* 어웨이 팀 */}
              <div className="flex flex-col items-center w-1/4">
                <img
                  src={`http://52.78.12.127:8080/logos/${game.logo}`}
                  onError={(e) => (e.target.src = altImage)}
                  alt="away"
                  className="w-14 h-14 rounded-full object-cover mb-1 border border-gray-300"
                />
                <span className="text-xs font-medium text-gray-700 text-center">{game.versus}</span>
              </div>
            </div>
          </Link>
        ))
      )}

      <div className="flex justify-center mt-4">
        {userMail === teamManagerMail ? (
          <Link to="/game/create" className="w-full">
            <button className="w-full h-12 border border-blue-500 text-blue-500 rounded-full text-base font-semibold hover:bg-blue-50 transition">
              경기 추가
            </button>
          </Link>
        ) : (
          <button
            onClick={handleLeave}
            className="w-full h-12 border border-red-500 text-red-500 rounded-full text-base font-semibold hover:bg-red-50 transition"
          >
            팀 탈퇴하기
          </button>
        )}
      </div>
    </div>
  );
};

export default TeamMatch;

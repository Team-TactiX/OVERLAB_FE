import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import field from '../../img/field.png';
import playerIcon from '../../img/player.png';
import uniformIcon from '../../img/uniform.png';
import GameDelete from './GameDelete';

const GameUpdate = ({
  setUpdate,
  setSelectedPositionKey,
  setUsers,
  setIsOpen,
  game,
  setGame,
  positionList,
  getCount,
  users,
}) => {
  const { gameId } = useParams();
  const count = getCount();

  const handlePositionClick = (positionKey) => {
    setSelectedPositionKey(positionKey);
    setIsOpen(true);
  };

  useEffect(() => {
    const fetchGame = async () => {
      const res = await fetch(`http://52.78.12.127:8080/api/games/saved-formation/${gameId}`);
      const data = await res.json();
      setGame(data);
      setUsers(data.playersMail);
    };
    fetchGame();
  }, [gameId]);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://52.78.12.127:8080/api/games/update-game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(game),
      });

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

  if (!game) return <div className="text-center mt-10">로딩 중...</div>;

  return (
    <div className="px-[2vw] py-[15vh] max-w-[768px] mx-auto bg-[#f9f9f9] flex flex-col items-center">
      {/* 상단: 날짜 및 VS 정보 */}
      <h2 className="text-[2.4vh] font-bold mb-[1.2vh]">
        {game.date.slice(0, 10)} VS {game.versus}
      </h2>

      {/* 라인업 통계 */}
      <div className="flex gap-[1.2vh] items-center text-[1.6vh] font-medium mb-[1.8vh]">
        <span className="text-gray-500">Starting: {users.length}</span>
        <span className="text-green-500">Lineup: {count}</span>
      </div>

      {/* 필드 이미지 및 포지션 */}
      <div
        className="relative w-[49vh] h-[42vh] mb-[2vh]"
        style={{
          backgroundImage: `url(${field})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute w-full h-full">
  {positionList.map(({ key, label, top, left }) => (
    <button key={key} onClick={() => handlePositionClick(key)}>
      <div
        className="absolute flex flex-col items-center"
        style={{
          top,
          left,
          transform: 'translate(-0%, -0%)',
        }}
      >
        <img
          src={game[key] ? uniformIcon : playerIcon}
          alt="player"
          className="w-[4.5vh] h-[4.5vh] object-contain"
        />
        <span className="text-white font-bold text-[1.8vh] whitespace-nowrap drop-shadow-[0_0_0.6vh_black] mt-[-2vh]">
          {game[key] ? game[key].userName : label}
        </span>
      </div>
    </button>
  ))}
</div>

      </div>

      <div className="w-full max-w-[360px] mb-[2.5vh]">
  <div className="text-[2vh] font-bold text-[#2c3e50] text-left">{game.team?.teamName}</div>
  <div className="text-[1.6vh] text-gray-500 mt-[0.2vh] text-left">매니저: {game.team?.teamManager?.userName}</div>
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
          <Link to={`/pr/list/${gameId}`} className="w-full">
            <button
              className="w-full border-2 border-green-500 text-green-600 font-semibold py-[1.2vh] rounded-full hover:bg-green-50"
            >
              📋 요청 확인
            </button>
          </Link>
        </div>

        {/* 삭제 버튼 */}
        <button
          onClick={() => document.getElementById('delete-button').click()}
          className="w-full max-w-[360px] bg-red-100 text-red-600 font-semibold py-[1.2vh] rounded-full hover:bg-red-200"
        >
          🗑 경기 삭제
        </button>
      </div>

      {/* 삭제 컴포넌트 */}
      <div style={{ display: 'none' }}>
        <GameDelete gameId={gameId} teamId={game.team?.teamId} />
      </div>
    </div>
  );
};

export default GameUpdate;

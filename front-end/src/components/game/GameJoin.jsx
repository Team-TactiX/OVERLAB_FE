import { Link } from 'react-router-dom';
import soccerFieldIcon from '../../img/field.png'; // 축구장 아이콘 이미지 경로

const GameJoin = ({ userMail, users, gameId, hasPermission, handleRemovePosition }) => {
  const isAlreadyJoined = users?.some((user) => user.userMail === userMail);

  const handleJoinGame = async () => {
    if (isAlreadyJoined) return alert('이미 참가 중입니다.');
    try {
      const res = await fetch(`http://52.78.12.127:8080/api/games/${gameId}/insert-to-game`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMail }),
      });
      if (res.ok) {
        alert('경기 참가가 완료되었습니다.');
        window.location.reload();
      } else {
        alert(await res.text());
      }
    } catch (err) {
      console.error(err);
      alert('서버 오류가 발생했습니다.');
    }
  };

  const handleLeaveGame = async () => {
    if (!isAlreadyJoined) return alert('참가 중이 아닙니다.');
    try {
      if (hasPermission) {
        await handleRemovePosition();
      }
      const res = await fetch(`http://52.78.12.127:8080/api/games/${gameId}/remove-from-game`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMail }),
      });
      if (res.ok) {
        alert('경기 참가 취소가 완료되었습니다.');
        window.location.reload();
      } else {
        alert(await res.text());
      }
    } catch (err) {
      console.error(err);
      alert('경기 취소 중 서버 오류가 발생했습니다.');
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between w-full gap-[1vh] mb-[2vh]">
        {/* 경기 참가 버튼 */}
        <button
          onClick={handleJoinGame}
          className="flex items-center justify-center gap-2 bg-[#00C851] text-white font-semibold text-[1.8vh] rounded-[3vh] h-[5.5vh] w-[48%] shadow-md hover:bg-[#00b44b] hover:-translate-y-[0.3vh] hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-200"
        >
          <span className="text-[2vh] font-bold">⚽</span>
          <span className="tracking-wide">경기 참가</span>
        </button>

        {/* 참가 취소 버튼 (연한 빨간색) */}
        <button
          onClick={handleLeaveGame}
          className="flex items-center justify-center gap-2 bg-[#FFCDD2] text-[#B71C1C] font-semibold text-[1.8vh] rounded-[3vh] h-[5.5vh] w-[48%] shadow-md hover:bg-[#EF9A9A] hover:-translate-y-[0.3vh] hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-200"
        >
          <span className="text-[2vh] font-bold">❌</span>
          <span className="tracking-wide">참가 취소</span>
        </button>
      </div>

      {/* 포메이션 요청 버튼 */}
      {!hasPermission && (
        <Link to={`/pr/list/${gameId}`} className="w-full block">
          <button
            className="flex items-center justify-center gap-2 bg-white text-[#00C851] font-semibold text-[1.8vh] rounded-[3vh] h-[5.5vh] w-full shadow-md border-2 border-[#00C851] hover:text-green hover:-translate-y-[0.3vh] hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-200"
          >
            <img src={soccerFieldIcon} alt="축구장" className="w-[2.4vh] h-[2.4vh]" />
            <span className="tracking-wide">포메이션 요청</span>
          </button>
        </Link>
      )}
    </div>
  );
};

export default GameJoin;

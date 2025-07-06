import { useNavigate } from "react-router-dom";

const FeedMercenary = ({ post, userMail, onClose }) => {
  const gameId = post.game.gameId
  const navigate = useNavigate();
  const handleMercenary = async () => {
    try {
      const res = await fetch(`http://52.78.12.127:8080/api/games/${gameId}/insert-to-game`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMail }),
      });
      if (res.ok) {
        alert('신청 성공!');
        onClose();
        navigate(`/game/${gameId}`);
      } else {
        alert(await res.text());
      }
    } catch (err) {
      console.error(err);
      alert('서버 오류가 발생했습니다.');
    }
  };


  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
      <div onClick={e => e.stopPropagation()} className="bg-white rounded-[2vh] p-[4vh_3vh] w-[90%] max-w-[360px] box-border shadow-lg">
        <h3 className="text-[2.4vh] font-bold mb-[2vh]">매칭 신청</h3>
        <p className="text-center text-[1.7vh] mb-[3vh]">용병 신청 하시겠습니까?</p>

<div className="flex justify-between gap-[1.5vh]">
  <button
    onClick={onClose}
    className="flex-1 border border-gray-400 text-gray-600 py-[1.2vh] rounded-[1vh] hover:bg-gray-100 active:scale-95 transition"
  >
    취소
  </button>
  <button
    onClick={handleMercenary}
    className="flex-1 border border-green-500 text-green-500 py-[1.2vh] rounded-[1vh] hover:bg-green-50 active:scale-95 transition"
  >
    신청
  </button>
</div>

      </div>
    </div>
  )
}

export default FeedMercenary;
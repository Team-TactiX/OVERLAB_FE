import { useNavigate } from "react-router-dom";

const FeedMercenary = ({ post, userMail, onClose }) => {
  const gameId = post.game.gameId
  const navigate = useNavigate();
  const handleMercenary = async () => {
    try {
      const res = await fetch(`/api/games/${gameId}/insert-to-game`, {
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
            <p>용병 신청 하시겠습니까?</p>
            <button onClick={onClose} className="w-full p-2 bg-red-500 text-white">취소</button>
            <button onClick={handleMercenary} className="w-full p-2 bg-green-500 text-white">신청</button>
      </div>
    </div>
  )
}

export default FeedMercenary;
import { useNavigate } from "react-router-dom";

const TeamFeedDelete = ({ teamFeedId, teamFeed }) => {
  const navigate = useNavigate();
  const teamId = teamFeed.teamId;

  const handleDelete = async () => {
    const confirmDelete = window.confirm('정말로 팀 게시글을 삭제할까요?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/files/${teamFeedId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        alert('삭제 완료');
        navigate(`/teamfeed/list/${teamId}`);
      } else {
        const error = await res.text();
        alert('삭제 실패: ' + error);
      }
    } catch (err) {
      console.error(err);
      alert('서버 오류');
    }
  };

  return (
    <>
      <button onClick={handleDelete} >삭제하기</button>
    </>
  )
}

export default TeamFeedDelete;
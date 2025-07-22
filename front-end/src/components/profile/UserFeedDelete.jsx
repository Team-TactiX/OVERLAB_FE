import { useNavigate } from 'react-router-dom';

const UserFeedDelete = ({ userFeedId, userFeed, renderButton }) => {
  const navigate = useNavigate();
  const userId = userFeed.userId;

  const handleDelete = async () => {
    const confirmDelete = window.confirm('정말로 게시글을 삭제할까요?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://52.78.12.127:8080/api/users/files/${userFeedId}`,
        {
          method: 'DELETE',
        },
      );

      if (res.ok) {
        alert('삭제 완료');
        navigate(`/profile/${userId}`);
      } else {
        const error = await res.text();
        alert('삭제 실패: ' + error);
      }
    } catch (err) {
      console.error(err);
      alert('서버 오류');
    }
  };

  // 🔥 여기서 renderButton로 넘겨받았으면 외부 커스텀 버튼 사용
  if (renderButton) {
    return renderButton({ onClick: handleDelete });
  }

  // 기본 버튼
  return <button onClick={handleDelete}>삭제</button>;
};

export default UserFeedDelete;

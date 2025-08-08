const baseURL = import.meta.env.VITE_API_BASE_URL;

const useCommentDelete = () => {
  const commentDelete = async (comment) => {
    try {
      const response = await fetch(
        `http://52.78.12.127:8080/api/users/comments/${comment.feedId}`,
        {
          method: 'DELETE',
        },
      );
      if (!response.ok) {
        alert('오류 발생');
        throw new Error(`서버 오류: ${errorMessage}`);
      }
      alert('댓글이 삭제 됐습니다.');
      window.location.reload();
    } catch (error) {
      console.error('업데이트 실패:', error);
      alert('댓글 수정 중 오류가 발생했습니다.');
    }
  };

  return { commentDelete };
};

export default useCommentDelete;

const baseURL = import.meta.env.VITE_API_BASE_URL;

const useCommentCreate = () => {
  const commentCreate = async (body) => {
    try {
      const res = await fetch(`${baseURL}/api/users/comments/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || '댓글 등록 실패');
      }

      alert('댓글이 등록되었습니다.');
      window.location.reload();
    } catch (err) {
      console.error('등록 오류:', err);
      alert('댓글 등록 중 문제가 발생했습니다.');
    }
  };

  return { commentCreate };
};

export default useCommentCreate;

import { useState } from 'react';
const CommentCreate = ({ teamFeedId }) => {
  const [content, setContent] = useState('');
  const userMail = sessionStorage.getItem('userMail');
  const userId = sessionStorage.getItem('userId');

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }

    const body = {
      userMail: userMail,
      content: content,
      fileId: Number(teamFeedId),
      userId: Number(userId),
    };

    console.log(body);

    try {
      const res = await fetch('http://52.78.12.127:8080/api/comments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력해 주세요."
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
      />
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded-full text-sm hover:bg-green-600 transition"
      >
        ✔️
      </button>
    </div>
  );
};

export default CommentCreate; 
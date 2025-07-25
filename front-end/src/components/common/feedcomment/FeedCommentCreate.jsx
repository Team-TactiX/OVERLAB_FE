import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const FeedCommentCreate = ({ feedId }) => {
  const [content, setContent] = useState('');
  const userMail = sessionStorage.getItem('userMail');
  const userId = sessionStorage.getItem('userId');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }

    const body = {
      userMail: userMail,
      content: content,
      fileId: Number(feedId),
      userId: Number(userId),
    };

    try {
      const res = await fetch(
        'http://52.78.12.127:8080/api/users/comments/create',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );

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
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력하세요"
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        aria-label="댓글 입력창"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-full text-sm hover:bg-green-600 transition"
        aria-label="댓글 등록"
      >
        <FaCheck />
      </button>
    </form>
  );
};

export default FeedCommentCreate;

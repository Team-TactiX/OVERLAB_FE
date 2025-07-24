import { useState } from 'react';

const FeedCommentCreate = ({ feedId }) => {
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
      fileId: Number(feedId),
      userId: Number(userId),
    };

    console.log(body);

    try {
      const res = await fetch(
        'http://52.78.12.127:8080/api/users/comments/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        },
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
    <div className="mt-4 p-4 border rounded-lg bg-white shadow-sm">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력하세요..."
        className="w-full border border-gray-300 rounded p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
        rows={3}
      />
      <div className="flex justify-end mt-2">
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white text-sm px-4 py-1.5 rounded hover:bg-green-600 transition"
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default FeedCommentCreate;

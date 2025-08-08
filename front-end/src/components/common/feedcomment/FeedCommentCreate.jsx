import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import useCommentCreate from '../../../hooks/api/post/useCommentCreate';

const FeedCommentCreate = ({ feedId }) => {
  const [content, setContent] = useState('');
  const userMail = sessionStorage.getItem('userMail');
  const userId = sessionStorage.getItem('userId');

  const { commentCreate } = useCommentCreate();

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

    commentCreate(body);
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

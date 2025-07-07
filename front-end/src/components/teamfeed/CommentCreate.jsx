import { useState } from "react";

const CommentCreate = () => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    // 생성 로직
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

export default CommentCreate;

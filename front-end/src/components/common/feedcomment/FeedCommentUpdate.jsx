import { useState } from 'react';

const FeedCommentUpdate = ({ comment, onCancel }) => {
  const [editContent, setEditContent] = useState(comment.content);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('content', editContent);

    try {
      const response = await fetch(
        `http://52.78.12.127:8080/api/users/comments/update/${comment.feedId}`,
        {
          method: 'PUT',
          body: formData,
        },
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`서버 오류: ${errorMessage}`);
      }

      alert('댓글이 수정되었습니다.');
      window.location.reload();
    } catch (error) {
      console.error('업데이트 실패:', error);
      alert('댓글 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="mt-2">
      <textarea
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        className="w-full text-sm p-2 border border-gray-300 rounded resize-none mb-2"
        rows={3}
      />
      <div className="flex gap-2 justify-end">
        <button
          onClick={handleSubmit}
          className="text-xs text-green-500 hover:underline hover:text-green-600"
        >
          완료
        </button>
        <button
          onClick={onCancel}
          className="text-xs text-gray-400 hover:underline hover:text-gray-600"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default FeedCommentUpdate;

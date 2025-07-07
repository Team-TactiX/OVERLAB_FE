import { useState } from "react";

const CommentUpdate = ({ comment, onSave, onCancel }) => {
  const [editContent, setEditContent] = useState(comment.content);

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
          onClick={() => onSave(editContent)}
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

export default CommentUpdate;

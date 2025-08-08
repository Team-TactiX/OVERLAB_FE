import useCommentDelete from '../../../hooks/api/delete/useCommentDelete';

const FeedCommentDelete = ({ comment }) => {
  const { commentDelete } = useCommentDelete();

  const handleRemove = async () => {
    const confirmDelete = window.confirm('정말로 댓글을 삭제할까요?');
    if (!confirmDelete) return;

    commentDelete(comment);
  };

  return (
    <button
      onClick={handleRemove}
      className="text-xs text-red-500 hover:underline hover:text-red-600 transition"
    >
      댓글 삭제
    </button>
  );
};

export default FeedCommentDelete;

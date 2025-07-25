import { useParams } from 'react-router-dom';
import Comment from './Comment';
import CommentCreate from './CommentCreate';
import { useEffect, useState } from 'react';

const CommentList = ({ videoRef }) => {
  const { teamFeedId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://52.78.12.127:8080/api/comments/file/${teamFeedId}`,
        );
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error(err);
        alert('서버 오류');
      }
    };

    fetchComments();
  }, [teamFeedId]);

  return (
    <div className="pt-2">
      {/* 댓글 제목 */}
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        댓글 {comments.length}
      </h3>

      {/* 댓글 리스트 */}
      <ul className="space-y-4 mb-4">
        {comments.map((comment) => (
          <Comment key={comment.feedId} comment={comment} videoRef={videoRef} />
        ))}
      </ul>

      {/* 댓글 입력창 */}
      <CommentCreate teamFeedId={teamFeedId} />
    </div>
  );
};

export default CommentList;

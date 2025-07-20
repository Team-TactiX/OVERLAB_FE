import { useParams } from 'react-router-dom';
import Comment from './Comment';
import CommentCreate from './CommentCreate';
import { useEffect, useState } from 'react';

const CommentList = ({ videoRef }) => {
  const { teamFeedId } = useParams('teamFeedId');
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
    <div className="mt-4">
      <CommentCreate teamFeedId={teamFeedId} />
      <h3 className="text-md font-semibold mb-2">댓글 리스트</h3>
      <ul className="space-y-2">
        {comments.map((comment) => (
          <Comment key={comment.feedId} comment={comment} videoRef={videoRef} />
        ))}
      </ul>
    </div>
  );
};

export default CommentList;

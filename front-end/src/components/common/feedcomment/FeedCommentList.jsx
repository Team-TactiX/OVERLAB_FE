import { useParams } from 'react-router-dom';
import FeedComment from './FeedComment';
import FeedCommentCreate from './FeedCommentCreate';
import { useEffect, useState } from 'react';

const FeedCommentList = ({ videoRef }) => {
  const { feedId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://52.78.12.127:8080/api/users/comments/file/${feedId}`,
        );
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error(err);
        alert('서버 오류');
      }
    };

    fetchComments();
  }, [feedId]);

  return (
    <div className="mt-2">
      <FeedCommentCreate feedId={feedId} />
      <h3 className="text-md font-semibold mb-5 mt-12">댓글 리스트</h3>
      <ul className="space-y-1">
        {comments.map((comment) => (
          <FeedComment
            key={comment.feedId}
            comment={comment}
            videoRef={videoRef}
          />
        ))}
      </ul>
    </div>
  );
};

export default FeedCommentList;

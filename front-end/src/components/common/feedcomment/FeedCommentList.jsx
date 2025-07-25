// FeedCommentList.jsx
import { useParams } from 'react-router-dom';
import FeedComment from './FeedComment';
import FeedCommentCreate from './FeedCommentCreate';
import { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';

const FeedCommentList = ({ videoRef, toExpertProfile }) => {
  const { feedId } = useParams();

  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false); // 좋아요 상태 (더미)
  const [likeCount, setLikeCount] = useState(0); // 좋아요 개수 (더미)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://52.78.12.127:8080/api/users/comments/file/${feedId}`
        );
        if (!res.ok) throw new Error('댓글 불러오기 실패');
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error(err);
        alert('서버 오류');
      }
    };

    const fetchLikes = async () => {
      // 좋아요 정보도 API에서 받아올 수 있으면 추가 구현 필요
      setLiked(false);
      setLikeCount(12);
    };

    fetchComments();
    fetchLikes();
  }, [feedId]);

  const toggleLike = () => {
    // 좋아요 토글 API 호출 필요
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* 좋아요 + 전문가 프로필 버튼 (초록색 구분선 바로 위에) */}
      <div className="flex items-center justify-between mb- px-2">
        <button
          onClick={toggleLike}
          className={`flex items-center gap-2 text-sm font-semibold ${
            liked ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
          } transition`}
          aria-pressed={liked}
          type="button"
        >
          <FaThumbsUp className="w-5 h-5" />
          좋아요 {likeCount}
        </button>

        <button
          onClick={toExpertProfile}
          className="text-sm font-semibold text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md transition"
          type="button"
        >
          전문가 프로필 보기
        </button>
      </div>

      {/* 초록색 구분선 */}
      <div aria-hidden="true" className="border-t-4 border-green-500 my-3 " />

      {/* 댓글 수 제목 */}
      <h3 className="text-lg font-semibold text-gray-800 px-2 mt-12 mb-3">
        댓글 {comments.length}
      </h3>

      {/* 댓글 리스트 */}
      <ul className="space-y-4 max-h-80 overflow-y-auto px-2">
        {comments.length === 0 ? (
          <li className="text-center text-gray-500">댓글이 없습니다.</li>
        ) : (
          comments.map((comment) => (
            <FeedComment
              key={comment.feedId}
              comment={comment}
              videoRef={videoRef}
            />
          ))
        )}
      </ul>

      {/* 댓글 입력창 (댓글 주변 박스 유지) */}
      <div className="mt-6 px-2">
        <FeedCommentCreate feedId={feedId} />
      </div>
    </div>
  );
};

export default FeedCommentList;

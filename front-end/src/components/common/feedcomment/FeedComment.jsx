import { useEffect, useState } from 'react';
import FeedCommentDelete from './FeedCommentDelete';
import FeedCommentUpdate from './FeedCommentUpdate';
import useUser from '../../../hooks/api/get/useUser';

const FeedComment = ({ comment, videoRef }) => {
  const [isEditing, setIsEditing] = useState(false);
  const userId = sessionStorage.getItem('userId');
  const isAuthor = userId == comment.userId;

  const { user, fetchUser } = useUser();

  // 영상 시간 클릭시 해당 위치 이동
  const handleTimeClick = (timeStr) => {
    const [min, sec] = timeStr.split(':').map(Number);
    const timeInSeconds = min * 60 + sec;
    if (videoRef?.current) {
      videoRef.current.currentTime = timeInSeconds;
      videoRef.current.play();
    }
  };

  // 댓글 내용에서 시간 형식 텍스트 링크로 변환
  const parseContentWithTimeLinks = (text) => {
    const regex = /(\d{1,2}:\d{2})/g;
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <button
          key={index}
          onClick={() => handleTimeClick(part)}
          className="text-blue-500 underline hover:text-blue-700 text-xs ml-1"
          type="button"
        >
          {part}
        </button>
      ) : (
        <span key={index}>{part}</span>
      ),
    );
  };

  useEffect(() => {
    fetchUser(comment.userId);
  }, [comment]);

  return (
    <li
      className="text-sm leading-relaxed p-3 border border-gray-300 rounded-md bg-white"
      style={{ wordBreak: 'break-word' }}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="font-semibold text-gray-800">
          {user.userName || '익명'}
        </span>
        {isAuthor && (
          <div className="flex items-center gap-2">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs text-blue-500 hover:underline hover:text-blue-600"
                type="button"
              >
                댓글 수정
              </button>
            )}
            <FeedCommentDelete comment={comment} />
          </div>
        )}
      </div>

      {!isEditing ? (
        <div className="mb-1 text-gray-700">
          {parseContentWithTimeLinks(comment.content)}
        </div>
      ) : (
        <FeedCommentUpdate
          comment={comment}
          onCancel={() => setIsEditing(false)}
        />
      )}

      <div className="text-xs text-gray-400">
        {new Date(comment.createdAt).toLocaleString('ko-KR')}
      </div>
    </li>
  );
};

export default FeedComment;

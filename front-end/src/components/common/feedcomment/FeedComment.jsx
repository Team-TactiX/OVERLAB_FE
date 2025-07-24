import { useEffect, useState } from 'react';
import FeedCommentDelete from './FeedCommentDelete';
import FeedCommentUpdate from './FeedCommentUpdate';

const FeedComment = ({ comment, videoRef }) => {
  const [isEditing, setIsEditing] = useState(false);
  const userId = sessionStorage.getItem('userId');
  const [user, setUser] = useState('');
  const isAuthor = userId == comment.userId;

  const handleTimeClick = (timeStr) => {
    const [min, sec] = timeStr.split(':').map(Number);
    const timeInSeconds = min * 60 + sec;
    if (videoRef?.current) {
      videoRef.current.currentTime = timeInSeconds;
      videoRef.current.play(); // 자동 재생도 가능
    }
  };

  const parseContentWithTimeLinks = (text) => {
    const regex = /(\d{1,2}:\d{2})/g;
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <button
          key={index}
          onClick={() => handleTimeClick(part)}
          className="text-blue-500 underline hover:text-blue-700 text-xs ml-1"
        >
          {part}
        </button>
      ) : (
        <span key={index}>{part}</span>
      ),
    );
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://52.78.12.127:8080/api/users/check/id/${comment.userId}`,
        );
        const data = await response.json();
        setUser(data);
      } catch (err) {
        alert('서버 오류 발생');
        console.error(err);
      }
    };

    fetchUser();
  }, [comment]);

  return (
    <li className="p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-800">
          {user.userName}
        </span>
        {isAuthor && (
          <div className="flex items-center gap-2">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs text-blue-500 hover:underline hover:text-blue-600"
              >
                댓글 수정
              </button>
            )}
            <FeedCommentDelete comment={comment} />
          </div>
        )}
      </div>

      {!isEditing ? (
        <div className="text-sm text-gray-700 mb-1">
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

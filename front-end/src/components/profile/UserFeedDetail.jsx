import { useEffect, useRef, useState } from 'react';
import UserFeedUpdate from './UserFeedUpdate';
import UserFeedDelete from './UserFeedDelete';
import FeedCommentList from '../common/feedcomment/FeedCommentList';

const UserFeedDetail = ({ feedId }) => {
  const [update, setUpdate] = useState(false);
  const [userFeed, setUserFeed] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const videoRef = useRef(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch(
          `http://52.78.12.127:8080/api/users/files/file/${feedId}`,
        );
        if (!userRes.ok) throw new Error('네트워크 에러');
        const userData = await userRes.json();
        setUserFeed(userData);
        setIsAuthor(userData.userId == userId);
      } catch (error) {
        setUserFeed(null);
      }
    };

    fetchData();
  }, [feedId]);

  if (!userFeed) {
    return (
      <div className="max-w-xl mx-auto p-4 text-center text-gray-500">
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="relative max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
      {/* 드롭다운 버튼 */}
      {isAuthor && (
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-gray-500 hover:text-gray-800 text-xl"
          >
            ⋯
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-md z-10 overflow-hidden">
              <button
                onClick={() => {
                  setUpdate(true);
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
              >
                ✏️ <span>수정</span>
              </button>
              <UserFeedDelete
                feedId={feedId}
                userFeed={userFeed}
                renderButton={({ onClick }) => (
                  <button
                    onClick={() => {
                      onClick();
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    🗑️ <span>삭제</span>
                  </button>
                )}
              />
            </div>
          )}
        </div>
      )}

      {/* 본문 콘텐츠 */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {userFeed.title}
      </h2>

      <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96 rounded-xl overflow-hidden mb-4">
        {userFeed.fileType.startsWith('image/') ? (
          <img
            src={`http://52.78.12.127:8080/media/user/${userFeed.realFileName}`}
            alt="userFeed"
            className="w-full h-full object-cover"
          />
        ) : userFeed.fileType.startsWith('video/') ? (
          <video
            src={`http://52.78.12.127:8080/media/user/${userFeed.realFileName}`}
            ref={videoRef}
            controls
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-sm text-red-500">지원되지 않는 파일입니다.</div>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-[400px] overflow-y-auto">
        <p className="whitespace-pre-wrap text-gray-800">{userFeed.content}</p>
      </div>

      {update && <UserFeedUpdate setUpdate={setUpdate} userFeed={userFeed} />}

      <FeedCommentList videoRef={videoRef} />
    </div>
  );
};

export default UserFeedDetail;

import { useEffect, useRef, useState } from 'react';
import ExpertFeedUpdate from './ExpertFeedUpdate';
import ExpertFeedDelete from './ExpertFeedDelete';
import ExpertFeedCommentList from './ExpertFeedCommentList';
import { useNavigate } from 'react-router-dom';

const ExpertFeedDetail = ({ expertFeedId }) => {
  const [update, setUpdate] = useState(false);
  const [expertFeed, setExpertFeed] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const videoRef = useRef(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const userId = sessionStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expertRes = await fetch(
          `http://52.78.12.127:8080/api/users/files/file/${expertFeedId}`,
        );
        if (!expertRes.ok) throw new Error('네트워크 에러');
        const expertData = await expertRes.json();
        setExpertFeed(expertData);
        setIsAuthor(expertData.userId == userId);
      } catch (error) {
        setExpertFeed(null);
      }
    };

    fetchData();
  }, [expertFeedId]);

  const toExpert = () => {
    navigate(`/profile/${expertFeed.userId}`);
  };

  if (!expertFeed) {
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
              <ExpertFeedDelete
                expertFeedId={expertFeedId}
                expertFeed={expertFeed}
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
        {expertFeed.title}
      </h2>

      <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96 rounded-xl overflow-hidden mb-4">
        {expertFeed.fileType.startsWith('image/') ? (
          <img
            src={`http://52.78.12.127:8080/media/user/${expertFeed.realFileName}`}
            alt="expertFeed"
            className="w-full h-full object-cover"
          />
        ) : expertFeed.fileType.startsWith('video/') ? (
          <video
            src={`http://52.78.12.127:8080/media/user/${expertFeed.realFileName}`}
            ref={videoRef}
            controls
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-sm text-red-500">지원되지 않는 파일입니다.</div>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-[400px] overflow-y-auto">
        <p className="whitespace-pre-wrap text-gray-800">
          {expertFeed.content}
        </p>
      </div>

      <button
        className="mt-[1vh] bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 shadow-md"
        onClick={toExpert}
      >
        전문가 프로필로 이동
      </button>

      {update && (
        <ExpertFeedUpdate
          setUpdate={setUpdate}
          expertFeedId={expertFeedId}
          expertFeed={expertFeed}
        />
      )}

      <ExpertFeedCommentList videoRef={videoRef} />
    </div>
  );
};

export default ExpertFeedDetail;

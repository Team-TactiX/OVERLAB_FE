import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpertFeedUpdate from './ExpertFeedUpdate';
import ExpertFeedDelete from './ExpertFeedDelete';
import FeedCommentList from '../common/feedcomment/FeedCommentList';
import { FaUserTie } from 'react-icons/fa';

const ExpertFeedDetail = ({ feedId }) => {
  const [update, setUpdate] = useState(false);
  const [expertFeed, setExpertFeed] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);

  const videoRef = useRef(null);
  const userId = sessionStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expertRes = await fetch(`http://52.78.12.127:8080/api/users/files/file/${feedId}`);
        if (!expertRes.ok) throw new Error('네트워크 에러');
        const expertData = await expertRes.json();
        setExpertFeed(expertData);
        setIsAuthor(expertData.userId == userId);
      } catch (error) {
        setExpertFeed(null);
      }
    };

    fetchData();
  }, [feedId]);

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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6 relative space-y-6">
      {/* 드롭다운 메뉴 */}
      {isAuthor && (
        <div className="absolute top-15 right-4">
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-gray-400 hover:text-gray-700 text-xl"
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
                className="w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
              >
                ✏️ 수정
              </button>
              <ExpertFeedDelete
                feedId={feedId}
                expertFeed={expertFeed}
                renderButton={({ onClick }) => (
                  <button
                    onClick={() => {
                      onClick();
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    🗑️ 삭제
                  </button>
                )}
              />
            </div>
          )}
        </div>
      )}

      {/* 제목과 버튼 */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">{expertFeed.title}</h2>
        <button
          onClick={toExpert}
          className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-600 shadow-sm"
        >
          <FaUserTie className="text-base" />
          전문가 프로필 보기
        </button>
      </div>

      {/* 미디어 */}
      <div className="rounded-lg overflow-hidden bg-gray-100 aspect-video">
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
          <div className="p-8 text-center text-sm text-red-500">📁 지원되지 않는 파일입니다.</div>
        )}
      </div>

      {/* 본문 */}
      <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
        <p className="whitespace-pre-wrap text-gray-800 text-[0.95rem] leading-relaxed">
          {expertFeed.content}
        </p>
      </div>

      {/* 댓글 */}
      <div className="pt-1 border-t border-gray-200">
        <FeedCommentList videoRef={videoRef} />
      </div>

      {update && <ExpertFeedUpdate setUpdate={setUpdate} expertFeed={expertFeed} />}
    </div>
  );
};

export default ExpertFeedDetail; 
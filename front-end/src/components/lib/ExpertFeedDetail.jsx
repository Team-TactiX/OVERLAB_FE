import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpertFeedUpdate from './ExpertFeedUpdate';
import ExpertFeedDelete from './ExpertFeedDelete';
import FeedCommentList from '../common/feedcomment/FeedCommentList';

// 상단 고정 헤더
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="mt-12 sticky top-0 z-50 bg-[#e8f5e9] h-16 flex items-center justify-center px-4 shadow border-b border-[#d0e0d0]">
      <button
        onClick={() => navigate(-1)}
        className="absolute left-4 text-green-700 font-semibold text-xl"
        type="button"
      >
        ←
      </button>
      <h1 className="text-[1.05rem] font-semibold text-gray-800 m-0">게시글 보기</h1>
    </header>
  );
};

const ExpertFeedDetail = ({ feedId }) => {
  const [update, setUpdate] = useState(false);
  const [expertFeed, setExpertFeed] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);
  const userId = sessionStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://52.78.12.127:8080/api/users/files/file/${feedId}`);
        if (!res.ok) throw new Error('네트워크 에러');
        const data = await res.json();
        setExpertFeed(data);
        setIsAuthor(data.userId == userId);
      } catch {
        setExpertFeed(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [feedId, userId]);

  const toExpertProfile = () => {
    if (expertFeed) {
      navigate(`/profile/${expertFeed.userId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#fafafa]">
        <p className="text-gray-400 text-sm">로딩 중...</p>
      </div>
    );
  }

  if (!expertFeed) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#fafafa]">
        <p className="text-gray-500 text-sm">게시글을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] min-h-screen">
      {/* 상단 고정 헤더 */}
      <Header />

      {/* 헤더 높이만큼 여백 확보 */}
      <div className="">
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md relative" style={{ borderRadius: 0 }}>
          {/* 작성자 메뉴 */}
          {isAuthor && (
            <div className="absolute top-10 right-4">
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="text-gray-400 hover:text-gray-700 text-xl"
                aria-label="게시글 메뉴 열기"
                type="button"
              >
                ⋯
              </button>
              {showMenu && (
                <div
                  className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-md z-10"
                  style={{ borderRadius: 0 }}
                >
                  <button
                    onClick={() => {
                      setUpdate(true);
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    type="button"
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
                        type="button"
                      >
                        🗑️ 삭제
                      </button>
                    )}
                  />
                </div>
              )}
            </div>
          )}

          {/* 제목 */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pt-4 break-words">
            {expertFeed.title}
          </h2>

          {/* 미디어 */}
          <div className="overflow-hidden bg-gray-100 aspect-video mb-5" style={{ borderRadius: 0 }}>
            {expertFeed.fileType?.startsWith('image/') ? (
              <img
                src={`http://52.78.12.127:8080/media/user/${expertFeed.realFileName}`}
                alt="media"
                className="w-full h-full object-cover"
              />
            ) : expertFeed.fileType?.startsWith('video/') ? (
              <video
                src={`http://52.78.12.127:8080/media/user/${expertFeed.realFileName}`}
                ref={videoRef}
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="p-8 text-center text-sm text-red-500">
                📁 지원되지 않는 파일입니다.
              </div>
            )}
          </div>

          {/* 본문 */}
          <div
            className="bg-gray-50 p-5 border border-gray-200 text-gray-800 text-[0.95rem] leading-relaxed whitespace-pre-wrap mb-10"
            style={{ borderRadius: 0 }}
          >
            {expertFeed.content}
          </div>

          {/* 댓글 + 좋아요 + 전문가 프로필 버튼 */}
          <FeedCommentList videoRef={videoRef} toExpertProfile={toExpertProfile} />

          {/* 수정 모달 */}
          {update && <ExpertFeedUpdate setUpdate={setUpdate} expertFeed={expertFeed} />}
        </div>
      </div>
    </div>
  );
};

export default ExpertFeedDetail;

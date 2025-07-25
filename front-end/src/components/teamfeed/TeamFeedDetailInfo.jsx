import { useEffect, useRef, useState } from 'react';
import TeamFeedUpdate from './TeamFeedUpdate';
import TeamFeedDelete from './TeamFeedDelete';
import CommentList from './CommentList';
import { FaThumbsUp } from 'react-icons/fa';

const TeamFeedDetailInfo = ({ teamFeedId }) => {
  const [update, setUpdate] = useState(false);
  const [teamFeed, setTeamFeed] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [likeCount, setLikeCount] = useState(1); // 임시 값
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://52.78.12.127:8080/api/files/file/${teamFeedId}`);
        if (!res.ok) throw new Error('네트워크 에러');
        const data = await res.json();
        setTeamFeed(data);
      } catch (error) {
        setTeamFeed(null);
      }
    };
    fetchData();
  }, [teamFeedId]);

  if (!teamFeed) {
    return (
      <div className="text-center py-12 text-gray-500 text-lg font-semibold">
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="relative max-w-xl mx-auto mt-0 bg-white p-5 shadow-md" style={{ borderRadius: '0' }}>
      {/* 우측 상단 메뉴 */}
      <div className="absolute top-5 right-5">
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="text-gray-400 hover:text-gray-700 text-2xl select-none"
          aria-label="게시글 메뉴 열기"
          type="button"
        >
          ⋯
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-300 z-20 overflow-hidden shadow-lg" style={{ borderRadius: '0' }}>
            <button
              onClick={() => {
                setUpdate(true);
                setShowMenu(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              type="button"
            >
              ✏️ 수정
            </button>
            <TeamFeedDelete
              teamFeedId={teamFeedId}
              teamFeed={teamFeed}
              renderButton={({ onClick }) => (
                <button
                  onClick={() => {
                    onClick();
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
                  type="button"
                >
                  🗑️ 삭제
                </button>
              )}
            />
          </div>
        )}
      </div>

      {/* 제목 */}
      <h2 className="text-2xl font-extrabold mb-2 text-gray-900 break-words">
        {teamFeed.title}
      </h2>

      {/* 작성자 정보 */}
      <div className="text-sm text-gray-500 mb-5">
        작성자: <span className="font-medium">{teamFeed.writer || '이름 없음'}</span>
      </div>

      {/* 미디어 */}
      <div className="w-full h-64 overflow-hidden mb-5 bg-gray-100 shadow-inner flex items-center justify-center" style={{ borderRadius: '0' }}>
        {teamFeed.fileType.startsWith('image/') ? (
          <img
            src={`http://52.78.12.127:8080/media/team/${teamFeed.realFileName}`}
            alt="teamFeed"
            className="w-full h-full object-cover"
            loading="lazy"
            style={{ borderRadius: '0' }}
          />
        ) : teamFeed.fileType.startsWith('video/') ? (
          <video
            src={`http://52.78.12.127:8080/media/team/${teamFeed.realFileName}`}
            ref={videoRef}
            controls
            className="w-full h-full object-cover"
            style={{ borderRadius: '0' }}
          />
        ) : (
          <div className="text-sm text-red-500">지원되지 않는 파일입니다.</div>
        )}
      </div>

      {/* 본문 */}
      <div className="bg-gray-50 p-5 border border-gray-300 whitespace-pre-wrap mb-8 text-gray-800 leading-relaxed" style={{ borderRadius: '0' }}>
        {teamFeed.content}
      </div>

      {/* 좋아요 버튼 */}
      <div className="mb-8">
        <button
          type="button"
          className="flex items-center gap-2 px-5 py-2 border border-green-500 text-green-600 hover:bg-green-50 transition font-semibold"
          onClick={() => setLikeCount((prev) => prev + 1)}
          aria-label="좋아요 버튼"
          style={{ borderRadius: '9999px' }} // 이건 원형 유지해도 됨 (버튼)
        >
          <FaThumbsUp />
          <span>좋아요 {likeCount}</span>
        </button>
      </div>

      {/* 좋아요와 댓글 사이 구분 띠 */}
      <div
        aria-hidden="true"
        className="my-8 border-t-2 border-green-300"
      />

      {/* 댓글 카드 */}
      <CommentList videoRef={videoRef} />

      {/* 수정창 */}
      {update && (
        <TeamFeedUpdate
          setUpdate={setUpdate}
          teamFeedId={teamFeedId}
          teamFeed={teamFeed}
        />
      )}
    </div>
  );
};

export default TeamFeedDetailInfo;

import { useEffect, useRef, useState } from 'react';
import TeamFeedUpdate from './TeamFeedUpdate';
import TeamFeedDelete from './TeamFeedDelete';
import CommentList from './CommentList';

const TeamFeedDetailInfo = ({ teamFeedId }) => {
  const [update, setUpdate] = useState(false);
  const [teamFeed, setTeamFeed] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamRes = await fetch(
          `http://52.78.12.127:8080/api/files/file/${teamFeedId}`,
        );
        if (!teamRes.ok) throw new Error('네트워크 에러');
        const teamData = await teamRes.json();
        setTeamFeed(teamData);
      } catch (error) {
        setTeamFeed(null);
      }
    };
    fetchData();
  }, [teamFeedId]);

  if (!teamFeed) {
    return (
      <div className="max-w-xl mx-auto p-4 text-center text-gray-500">
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="relative max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
      {/* 드롭다운 버튼 */}
      <div className="absolute top-6 right-4">
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
            <TeamFeedDelete
              teamFeedId={teamFeedId}
              teamFeed={teamFeed}
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

      {/* 본문 콘텐츠 */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {teamFeed.title}
      </h2>

      <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96 rounded-xl overflow-hidden mb-4">
        {teamFeed.fileType.startsWith('image/') ? (
          <img
            src={`http://52.78.12.127:8080/media/team/${teamFeed.realFileName}`}
            alt="teamFeed"
            className="w-full h-full object-cover"
          />
        ) : teamFeed.fileType.startsWith('video/') ? (
          <video
            src={`http://52.78.12.127:8080/media/team/${teamFeed.realFileName}`}
            ref={videoRef}
            controls
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-sm text-red-500">지원되지 않는 파일입니다.</div>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-[400px] overflow-y-auto">
        <p className="whitespace-pre-wrap text-gray-800">{teamFeed.content}</p>
      </div>

      {update && (
        <TeamFeedUpdate
          setUpdate={setUpdate}
          teamFeedId={teamFeedId}
          teamFeed={teamFeed}
        />
      )}

      <CommentList videoRef={videoRef} />
    </div>
  );
};

export default TeamFeedDetailInfo;

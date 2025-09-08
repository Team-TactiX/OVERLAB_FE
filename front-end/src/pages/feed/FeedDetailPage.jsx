import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Feed from '../../components/feed/Feed';
import FeedEdit from '../../components/feed/FeedEdit';
import FeedMatch from '../../components/feed/FeedMatch';
import useFeedDelete from '../../components/feed/FeedDelete';
import FeedMercenary from '../../components/feed/FeedMercenary';
import usePost from '../../hooks/usePost';
import useUser from '../../hooks/api/get/useUser';

const FeedDetailPage = () => {
  const navigate = useNavigate();
  const userMail = sessionStorage.getItem('userMail');
  const userId = sessionStorage.getItem('userId');
  const { contentId } = useParams();

  const [post, setPost] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [showMercenaryModal, setShowMercenaryModal] = useState(false);

  const { game, team } = usePost({ contentId });
  const { user } = useUser({ userId });

  const handleDelete = useFeedDelete(post?.contentId);

  const handleUpdate = (updatedPost) => {
    setPost(updatedPost);
    setShowEditModal(false);
  };

  return (
    <div className="px-4 mx-auto">
      {/* 상단 헤더 */}
      <div className="relative my-4 flex items-center justify-center h-8">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 text-lg ml-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-center whitespace-nowrap overflow-hidden text-ellipsis">
          {post
            ? post.category === '매칭'
              ? '매칭'
              : post.category === '팀원 모집'
              ? '팀원 모집'
              : post.category === '용병'
              ? '용병'
              : ''
            : ''}
        </h2>
      </div>

      {/* 게시글 본문 */}
      <Feed onLoaded={setPost} />

      {post && (
        <div className="bg-green-50 rounded-lg shadow p-4">
          <p className="text-center text-lg font-bold mb-2">{post.title}</p>
          {/* 게시글 정보 */}
          {post.category === '매칭' || post.category === '용병' ? (
            <div className="bg-white p-2 rounded-lg mb-2">
              <div className="flex justify-between mb-2 text-base">
                <span className="text-gray-500">매칭 날짜</span>
                <span className="text-gray-700 font-medium">
                  {post.matchDay
                    ? post.matchDay.replace('T', ' ').slice(0, 16)
                    : null}
                </span>
              </div>
              <div className="flex justify-between mb-2 text-base">
                <span className="text-gray-500">팀 이름</span>
                <span className="text-gray-700 font-medium">
                  {team?.teamName}
                </span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-500">지역</span>
                <span className="text-gray-700 font-medium">
                  {team?.location}
                </span>
              </div>
              {post.category === '용병' && (
                <div className="flex justify-between text-base">
                  <span className="text-gray-500">매치 이름</span>
                  <span className="text-gray-700 font-medium">
                    {game.gameName}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-4 rounded-lg mb-2">
              <div className="flex justify-between mb-2 text-base">
                <span className="text-gray-500">팀 이름</span>
                <span className="text-gray-700 font-medium">
                  {team?.teamName}
                </span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-500">지역</span>
                <span className="text-gray-700 font-medium">
                  {team?.location}
                </span>
              </div>
            </div>
          )}

          {/* 기본 정보 */}
          <div className="flex justify-between mb-2 text-base">
            <span className="text-gray-500">작성자</span>
            <span className="text-gray-700">{user.userName}</span>
          </div>
          <div className="flex justify-between mb-2 text-base">
            <span className="text-gray-500">작성일</span>
            <span className="text-gray-700">
              {post.createTime.slice(0, 10)}
            </span>
          </div>
          <div className="flex justify-between mb-2 text-base">
            <span className="text-gray-500">조회수</span>
            <span className="text-gray-700">{post.views}</span>
          </div>

          {/* 게시글 내용 */}
          <div className="relative bg-white p-2 rounded-lg mb-4 text-base min-h-16">
            {post.content}
          </div>

          {/* 버튼 */}
          <div className="flex flex-col divide-y divide-gray-300 text-base">
            {post.category === '매칭' && (
              <button
                onClick={() => setShowMatchModal(true)}
                className="flex justify-between items-center p-2"
              >
                <span>매칭 신청</span>
                <span>➔</span>
              </button>
            )}

            {post.category === '용병' && (
              <button
                onClick={() => setShowMercenaryModal(true)}
                className="flex justify-between items-center p-2"
              >
                <span>용병 신청</span>
                <span>➔</span>
              </button>
            )}

            <button
              onClick={() => navigate(`/team/${post.team.teamId}`)}
              className="flex justify-between items-center p-2"
            >
              <span>팀 상세페이지</span>
              <span>➔</span>
            </button>

            {userMail === post.userMail && (
              <>
                <button
                  onClick={() => setShowEditModal(true)}
                  className="flex justify-between items-center p-2"
                >
                  <span>수정</span>
                  <span>➔</span>
                </button>
                <button
                  onClick={handleDelete}
                  className="flex justify-between items-center p-2 text-red-500"
                >
                  <span>삭제</span>
                  <span>➔</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* 수정 모달 */}
      {post && showEditModal && (
        <FeedEdit
          post={post}
          onUpdate={handleUpdate}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {/* 매칭 모달 */}
      {post && showMatchModal && (
        <FeedMatch
          post={post}
          userMail={userMail}
          onClose={() => setShowMatchModal(false)}
        />
      )}

      {/* 용병 모달 */}
      {post && showMercenaryModal && (
        <FeedMercenary
          post={post}
          userMail={userMail}
          onClose={() => setShowMercenaryModal(false)}
        />
      )}
    </div>
  );
};

export default FeedDetailPage;

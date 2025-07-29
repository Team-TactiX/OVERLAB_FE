import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Profile from '../../components/profile/Profile';
import ProfileFeedCreate from '../../components/profile/ProfileFeedCreate';
import UserFeedList from '../../components/profile/UserFeedList';
import useCareer from '../../hooks/api/get/useCareer';
import CreateCareer from '../../components/profile/CreateCareer';
import Career from '../../components/profile/Career';

const ProfilePage = () => {
  const [myProfile, setMyProfile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showCreateCareer, setShowCreateCareer] = useState(false);
  const navigate = useNavigate();
  const { careerList } = useCareer();

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="pt-[10vh] px-6 md:px-10 pb-[3vh] bg-gray-50 min-h-screen">         
      {/* ── 프로필 카드 ─────────────────────────────────── */}
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6">
        {/* 프로필 정보 */}
        <Profile setMyProfile={setMyProfile} />

        {/* 설정 리스트 */}
        {myProfile && (
          <ul className="divide-y divide-gray-300 mt-6">
            {showMenu && (
              <>
                {/* 회원정보 편집 */}
                <li
                  onClick={() =>
                    navigate('/profile/update', { state: { mode: 'update' } })
                  }
                  className="flex items-center justify-between py-5 px-2 cursor-pointer hover:bg-gray-50 transition group"
                >
                  <span className="text-gray-600">회원정보 편집</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="h-5 w-5 text-gray-400 group-hover:text-gray-800 group-hover:translate-x-1 transition"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </li>

                {/* 비밀번호 변경 */}
                <li
                  onClick={() =>
                    navigate('/profile/update', { state: { mode: 'password' } })
                  }
                  className="flex items-center justify-between py-5 px-2 cursor-pointer hover:bg-gray-50 transition group"
                >
                  <span className="text-gray-600">비밀번호 변경</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="h-5 w-5 text-gray-400 group-hover:text-gray-800 group-hover:translate-x-1 transition"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </li>
              </>
            )}

            {/* 로그아웃 */}
            <li
              onClick={() => {
                sessionStorage.removeItem('userMail');
                navigate('/');
              }}
              className="flex items-center justify-between py-5 px-2 cursor-pointer text-red-500 hover:bg-red-50 transition group"
            >
              <span className="group-hover:font-bold">로그아웃</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-5 w-5 text-red-400 group-hover:text-red-500 group-hover:translate-x-1 transition"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </li>
            {showMenu ? (
              <li
                onClick={handleMenu}
                className="text-center pt-[2vh] cursor-pointer"
              >
                ▲
              </li>
            ) : (
              <li
                onClick={handleMenu}
                className="text-center pt-[2vh] cursor-pointer"
              >
                ▼
              </li>
            )}
          </ul>
        )}
      </div>

      {/* 경력 카드 */}
      <div className="mt-4 bg-white w-full max-w-lg rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-bold">경력</p>
          <p
            className="text-sm text-blue-600 hover:underline cursor-pointer"
            onClick={() => setShowCreateCareer(true)}
          >
            경력 추가
          </p>
        </div>
        {careerList.length != 0 ? (
          careerList.map((career) => {
            return <Career career={career} />;
          })
        ) : (
          <p>경력이 없습니다.</p>
        )}
      </div>

      {showCreateCareer && (
        <CreateCareer setShowCreateCareer={setShowCreateCareer} />
      )}
      {/* 유저 피드 */}
      <div className="w-full max-w-5xl mt-8">
        <UserFeedList />
      </div>

      {/* ── 글쓰기 FAB + 툴팁 ─────────────────────────────── */}
      {myProfile && (
        <div className="fixed bottom-[10vh] right-[calc(clamp(1vh,(100vw-50vh)/2+1vh,100vw))] z-40 group">
          <button
            onClick={() => setShowModal(true)}
            className="
              w-[6.5vh] h-[6.5vh] rounded-full bg-white border-2 border-green-500
              text-green-500 shadow-lg flex items-center justify-center
              transition-transform duration-150
              group-hover:scale-110 group-hover:shadow-xl active:scale-95
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-[3vh] h-[3vh]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 3.487a2.32 2.32 0 113.281 3.281L7.5 19.41l-4.245 1.06 1.06-4.244L16.862 3.487z"
              />
            </svg>
          </button>

          {/* 툴팁 */}
          <div
            className="
              absolute right-[calc(100%+1.5vh)] top-1/2 -translate-y-1/2
              bg-gray-700 text-white text-[1.6vh] px-[1.2vh] py-[0.7vh]
              rounded-[1vh] shadow whitespace-nowrap
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
            "
          >
            게시글 작성
            <div
              className="
                absolute top-1/2 left-full -translate-y-1/2
                w-0 h-0 border-t-[8px] border-t-transparent
                border-b-[8px] border-b-transparent
                border-l-[8px] border-l-gray-700
              "
            />
          </div>
        </div>
      )}

      {/* ── 글쓰기 모달 ─────────────────────────────────── */}
      {showModal && <ProfileFeedCreate setShowModal={setShowModal} />}
    </div>
  );
};

export default ProfilePage;

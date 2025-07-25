import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Profile from '../../components/profile/Profile';

const ProfilePage = () => {
  const [myProfile, setMyProfile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="pt-[12vh] px-4 pb-[10vh] flex flex-col items-center">
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
    </div>
  );
};

export default ProfilePage;

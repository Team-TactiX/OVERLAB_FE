import { useNavigate } from 'react-router-dom';
import Profile from '../../components/profile/Profile';
import { useState } from 'react';
import ProfileFeedCreate from '../../components/profile/ProfileFeedCreate';

const ProfilePage = () => {
  const [myProfile, setMyProfile] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate();

  return (
    <div className="pt-[12vh] px-4 pb-[10vh] flex flex-col items-center">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6">

        {/* 프로필 정보 */}
        <Profile setMyProfile={setMyProfile} />

        {/* 설정 리스트 */}
        {myProfile && (<ul className="divide-y divide-gray-300 mt-6">
          <li
            onClick={() => navigate('/profile/update', { state: { mode: 'update' } })}
            className="flex items-center justify-between py-5 px-2 cursor-pointer hover:bg-gray-50 transition group"
          >
            <span className="text-gray-600">회원정보 편집</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
              className="h-5 w-5 text-gray-400 group-hover:text-gray-800 group-hover:translate-x-1 transition">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </li>

          <li
            onClick={() => navigate('/profile/update', { state: { mode: 'password' } })}
            className="flex items-center justify-between py-5 px-2 cursor-pointer hover:bg-gray-50 transition group"
          >
            <span className="text-gray-600">비밀번호 변경</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
              className="h-5 w-5 text-gray-400 group-hover:text-gray-800 group-hover:translate-x-1 transition">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </li>

          <li
            onClick={() => {
              sessionStorage.removeItem('userMail');
              navigate('/');
            }}
            className="flex items-center justify-between py-5 px-2 cursor-pointer text-red-500 hover:bg-red-50 transition group"
          >
            <span className="group-hover:font-bold">로그아웃</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
              className="h-5 w-5 text-red-400 group-hover:text-red-500 group-hover:translate-x-1 transition">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </li>
        </ul>)}
        
      </div>
      {myProfile && (<div className="fixed bottom-[10vh] right-[calc(clamp(1vh,(100vw-50vh)/2+1vh,100vw))] z-[1000] group">
        <button
          onClick={() => setShowModal(true)}
          className="w-[6.5vh] h-[6.5vh] border-2 border-green-500 text-green-500 bg-white rounded-full cursor-pointer shadow-lg flex items-center justify-center hover:bg-green-50 active:scale-95 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-[3vh] h-[3vh]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.32 2.32 0 113.281 3.281L7.5 19.41l-4.245 1.06 1.06-4.244L16.862 3.487z" />
          </svg>
        </button>
      </div>)}
      {showModal && <ProfileFeedCreate setShowModal={setShowModal} />}
    </div>
  );
};

export default ProfilePage;

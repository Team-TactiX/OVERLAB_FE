import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BsPersonFill } from 'react-icons/bs';

const Profile = ({ setMyProfile }) => {
  const [userData, setUserData] = useState(null);
  const { userId } = useParams();
  const myId = sessionStorage.getItem('userId');

  useEffect(() => {
    fetch(`http://52.78.12.127:8080/api/users/check/id/${userId}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then(setUserData)
      .catch((err) => console.error(err));
  }, [userId]);

  useEffect(() => {
    setMyProfile(userId === myId);
  }, [setMyProfile, userId, myId]);

  if (!userData) return <div className="text-center py-8">Loading...</div>;

  return (
    // <Container> 스타일 적용
    <div className="flex">
      {/* 프로필 이미지 */}
      <div
        className="relative mr-3 w-24 h-24 rounded-full border-4 border-gray-300 shadow-md overflow-hidden mb-3
                   flex items-center justify-center"
      >
        {userData.profileImage ? (
          <img
            src={userData.profileImage}
            alt="profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <BsPersonFill size="80%" className="text-gray-500" />
        )}
      </div>

      {/* <Box> 스타일 적용 */}
      <div className="flex flex-col">
        {/* <BoxBox> 스타일 적용 */}
        <div className="flex gap-[2vh]">
          {/* 이름 */}
          <h2 className="text-[1.3rem] font-bold text-gray-800 tracking-tight mb-1 text-center">
            {userData.userName}
          </h2>
          {/* 포지션 뱃지 */}
          <div className="flex justify-center gap-2 flex-wrap mb-4">
            {[
              userData.firstPosition,
              userData.secondPosition,
              userData.thirdPosition,
            ]
              .filter(Boolean)
              .map((pos) => (
                <span
                  key={pos}
                  className="bg-gray-100 px-[clamp(4px,1vw,8px)] py-1 rounded-full text-sm border border-gray-300"
                >
                  {pos}
                </span>
              ))}
          </div>
        </div>
        {/* 전화번호 */}
        <div className="bg-gray-100 px-4 py-2 rounded-lg text-base text-gray-600 mb-4 text-left">
          {userData.tel}
        </div>
      </div>
    </div>
  );
};

export default Profile;

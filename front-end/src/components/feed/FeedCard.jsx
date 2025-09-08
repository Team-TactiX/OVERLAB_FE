import { useEffect, useState } from 'react';
import altImage from '../../img/alt_image.png';

const FeedCard = ({ post, onClick }) => {
  const [team, setTeam] = useState('');

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(
          `http://52.78.12.127:8080/api/teams/${post.teamId}`,
        );
        const data = await response.json();
        setTeam(data);
      } catch (err) {
        alert('서버 오류');
        console.log(err);
      }
    };

    fetchTeam();
  }, [post]);

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg p-2 mb-4 shadow-md flex justify-between items-center cursor-pointer transition hover:bg-gray-200"
    >
      <div className="flex items-center">
        <img
          src={`http://52.78.12.127:8080/logos/${team.logo}`}
          onError={(e) => {
            e.target.src = altImage;
          }}
          className="w-20 h-20 rounded-full object-cover mr-2"
          alt="team logo"
        />

        <div className="flex flex-col">
          <p className="text-lg text-blue-500 m-0">{team.teamName}</p>
          <p className="text-2xl">{post.title}</p>
          {(post.category === '매칭' || post.category === '용병') &&
            post.matchDay && (
              <div className="text-base font-bold mt-1 text-gray-800">
                {new Date(post.matchDay).toLocaleString('ko-KR', {
                  month: 'long',
                  day: 'numeric',
                  weekday: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })}
              </div>
            )}
          <div className="flex items-center mt-1 text-gray-600 gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2.25c-4.97 0-9 4.03-9 9 0 7.12 9 10.5 9 10.5s9-3.38 9-10.5c0-4.97-4.03-9-9-9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 12.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
              />
            </svg>
            <p className="text-base">{team.location}</p>
          </div>
        </div>
      </div>
      <div
        className={`text-xl font-bold ${
          post.category === '매칭' ? 'text-green-500' : 'text-orange-500'
        }`}
      >
        {post.category === '매칭' ? '매칭 대기' : '모집 중'}
      </div>
    </div>
  );
};

export default FeedCard;

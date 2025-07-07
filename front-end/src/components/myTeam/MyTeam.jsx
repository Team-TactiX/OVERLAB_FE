import { Link } from 'react-router-dom';
import altImage from '../../img/alt_image.png';

const MyTeam = ({ team }) => {
  return (
    <Link
      to={`/team/${team.teamId}`}
      className="flex justify-between items-center p-[2vh] bg-white rounded-[1.2vh] shadow hover:shadow-lg transition w-full mb-[2vh]" // ✅ w-full & 여백 추가
    >
      {/* 팀 정보 */}
      <div className="flex items-center gap-[1.5vh]">
        <img
          src={`http://52.78.12.127:8080/logos/${team.logo}`}
          className="w-[7vh] h-[7vh] rounded-full object-cover"
          alt="team logo"
          onError={(e) => { e.target.src = altImage; }}
        />
        <div>
          <div className="text-[1.8vh] font-bold mb-[0.3vh]">{team.teamName}</div>
          <div className="text-[1.5vh] text-gray-500">{team.location} · {team.users.length}명</div>
        </div>
      </div>

      {/* 자세히 버튼 */}
      <div className="flex items-center gap-[0.2vh] text-blue-500 text-[1.6vh]">
        <span>내 팀 상세 보기</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-[2vh] h-[2vh]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
};

export default MyTeam;

import { Link } from 'react-router-dom';
import altImage from '../../img/alt_image.png';

const TeamCard = ({ team, posts }) => {
  const isRecruiting = (category) =>
    posts.some((post) => post.team.teamId === team.teamId && post.category === category);

  return (
    <Link
      to={`/team/${team.teamId}`}
      className="flex justify-between items-center p-[2vh] bg-white rounded-[1.2vh] shadow hover:shadow-lg transition"
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
          <div className="text-[1.7vh] font-bold mb-[0.3vh]">{team.teamName}</div>
          <div className="text-[1.5vh] text-gray-500 mb-[0.3vh]">{team.location} · {team.users.length}명</div>
          <div className="flex gap-[0.5vh] flex-wrap">
            {isRecruiting('팀원 모집') && <span className="text-[1.2vh] border border-gray-400 text-gray-700 px-[0.8vh] py-[0.3vh] rounded-full">팀원 모집 중 </span>}
            {isRecruiting('용병') && <span className="text-[1.2vh] border border-gray-400 text-gray-700 px-[0.8vh] py-[0.3vh] rounded-full">용병 모집 중</span>}
            {isRecruiting('매칭') && <span className="text-[1.2vh] border border-gray-400 text-gray-700 px-[0.8vh] py-[0.3vh] rounded-full">매칭 모집 중</span>}
          </div>
        </div>
      </div>

      {/* 자세히 버튼 */}
      <div className="flex items-center gap-[0.2vh] text-green-500 text-[1.5vh]">
        <span> 팀 상세 보기</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-[2vh] h-[2vh]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
};

export default TeamCard;

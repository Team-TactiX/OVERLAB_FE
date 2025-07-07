// MyTeamSection.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import altImage from '../../img/alt_image.png';
import ScrollContainer from 'react-indiana-drag-scroll';
import { FaCrown, FaUser } from 'react-icons/fa';

const MyTeamSection = () => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userMail = sessionStorage.getItem('userMail');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`http://52.78.12.127:8080/api/teams/mail/${userMail}`);
        if (response.ok) {
          const data = await response.json();
          setTeams(data);
          console.log(data)
        } else {
          console.log(await response.text());
        }
      } catch (err) {
        console.error(err);
        alert('서버와의 통신 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, [userMail]);

  if (isLoading) {
    return (
      <div className="py-[0.5vh]">
        <div className="flex justify-between items-center mb-[1.5vh] mt-[1vh]">
          <h2 className="text-[2.2vh] font-bold pl-[1vh] border-l-4 border-green-500 pb-[0.7vh] inline-block">
            My Team
          </h2>
        </div>
        <div className="text-center py-[2vh] text-[1.8vh]">불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="py-[1.5vh]">
      <div className="flex justify-between items-center mb-[1.5vh] mt-[1vh]">
        {/* 라벨 추가 */}
        <div>
          <div className="text-[1.2vh] text-green-500 font-bold mb-[0.5vh]">TEAM</div>
          <h2 className="text-[2.2vh] font-bold pl-[1vh] border-l-4 border-green-500 pb-[0.7vh] flex items-center gap-[0.5vh]">
            🏆 My Team
          </h2>
        </div>
        <Link to="/my-team" className="text-[1.5vh] text-blue-500 no-underline hover:underline">
          더보기
        </Link>
      </div>

      {teams.length === 0 ? (
        <div className="text-[1.8vh] text-gray-500 py-[1vh]">소속된 팀이 없습니다.</div>
      ) : (
        <ScrollContainer
          className="flex gap-[0.5vh] overflow-x-auto pb-[1vh] cursor-grab active:cursor-grabbing scrollbar-hide"
          horizontal
        >
          {teams.map((team) => (
            <Link
              key={team.teamId}
              to={`/team/${team.teamId}`}
              className="flex-shrink-0 bg-white border border-gray-300 p-[0.6vh] no-underline text-black flex flex-col items-center hover:border-green-500 hover:shadow-lg transition box-border rounded-[1.2vh] w-[12vh] min-w-[12vh] relative"
            >
              {/* 미니 뱃지 추가 */}
              <div className={`absolute top-[0.5vh] right-[0.5vh] flex items-center gap-[0.2vh] px-[0.5vh] py-[0.1vh] rounded-full shadow-sm
  ${team.teamManager.userMail === userMail ? 'bg-yellow-300 text-black' : 'bg-green-400 text-white'}`}>
  {team.teamManager.userMail === userMail ? (
    <>
      <FaCrown className="text-[1.1vh]" />
      <span className="text-[1.1vh] font-medium leading-none">매니저</span>
    </>
  ) : (
    <>
      <FaUser className="text-[1.1vh]" />
      <span className="text-[1.1vh] font-medium leading-none">팀원</span>
    </>
  )}
</div>



              <img
                src={`http://52.78.12.127:8080/logos/${team.logo}`}
                onError={(e) => {
                  e.target.src = altImage;
                }}
                className="w-[7vh] h-[7vh] rounded-full object-cover mb-[0.5vh] border border-white"
                alt="team logo"
              />
              <div className="text-[1.6vh] font-semibold text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[12vh] hover:text-green-500">
                {team.teamName}
              </div>
            </Link>
          ))}
        </ScrollContainer>
      )}
    </div>
  );
};

export default MyTeamSection;

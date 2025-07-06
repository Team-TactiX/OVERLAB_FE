import { useEffect, useState } from "react";
import UniformIcon from '../common/UniformIcon';
import { CiSquarePlus } from "react-icons/ci";
import TeamFeedCreate from "./TeamFeedCreate";

const TeamInfo = ({ teamId }) => {
  const userMail = sessionStorage.getItem('userMail')
  const [team, setTeam] = useState();
  const [teamUser, setTeamUser] = useState([]);
  const [teamManagerMail, setTeamManagerMail] = useState();
  const [create, setCreate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const teamRes = await fetch(`http://52.78.12.127:8080/api/teams/${teamId}`);
      const teamData = await teamRes.json();
      setTeam(teamData);
      setTeamManagerMail(teamData.teamManager?.userMail || '');

      const userRes = await fetch(`http://52.78.12.127:8080/api/teams/${teamId}/users-in-team`);
      setTeamUser(await userRes.json());
    };
    fetchData();

  }, [teamId]);

  if (!team) return<>로딩중</>

  return (
    <div>
      <>팀정보</>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={`http://52.78.12.127:8080/logos/${team.logo}`}
            onError={(e) => (e.target.src = altImage)}
            alt="팀 로고"
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h1 className="text-lg font-bold">{team.teamName}</h1>
            <div className="text-gray-500 text-sm">📍 {team.location}</div>
            <div className="text-gray-500 text-sm">👥 {teamUser.length}명</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <UniformIcon color={team.firstColor} size="28px" />
          <UniformIcon color={team.secondColor} size="28px" />
          {userMail === teamManagerMail && (
            <CiSquarePlus onClick={() => setCreate(true)} className="w-5 h-5" />
          )}
        </div>
        {create && <TeamFeedCreate teamId={teamId} setCreate={setCreate} />}
      </div>
    </div>
  )
}

export default TeamInfo;
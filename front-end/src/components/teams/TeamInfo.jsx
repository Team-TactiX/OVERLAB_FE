import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import altImage from '../../img/alt_image.png';
import setting from '../../img/setting.png';
import TeamMatch from './TeamMatch';
import TeamJoin from './TeamJoin';
import TeamFeedList from './TeamFeedList';
import UniformIcon from '../common/UniformIcon';

const TeamInfo = ({ teamId }) => {
  const [team, setTeam] = useState(null);
  const [teamUser, setTeamUser] = useState([]);
  const [games, setGames] = useState([]);
  const [teamManagerMail, setTeamManagerMail] = useState('');
  const [showMembers, setShowMembers] = useState(false);
  const userMail = sessionStorage.getItem('userMail');

  useEffect(() => {
    const fetchData = async () => {
      const teamRes = await fetch(`http://52.78.12.127:8080/api/teams/${teamId}`);
      const teamData = await teamRes.json();
      setTeam(teamData);
      setTeamManagerMail(teamData.teamManager?.userMail || '');

      const userRes = await fetch(`http://52.78.12.127:8080/api/teams/${teamId}/users-in-team`);
      setTeamUser(await userRes.json());

      const gamesRes = await fetch(`http://52.78.12.127:8080/api/games/team/${teamId}`);
      const text = await gamesRes.text();
      setGames(text ? JSON.parse(text) : []);
    };
    fetchData();
  }, [teamId]);

  if (!team) return <div className="text-center py-10">로딩 중...</div>;

  const isInTeam = teamUser.some(
    (user) => user.userMail?.toLowerCase() === userMail?.toLowerCase()
  );

  const manager = teamUser.find((u) => u.userMail === teamManagerMail);

  return (
    <div className="flex flex-col gap-8 p-4 max-w-lg mx-auto bg-white min-h-screen">

      {/* 팀 요약 */}
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
            <Link to={`/team/update/${teamId}`} className="ml-2">
              <img src={setting} alt="설정" className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>

      {/* 팀원 명단 */}
      <div>
        <div className="flex justify-between items-center cursor-pointer border-b pb-2" onClick={() => setShowMembers(!showMembers)}>
          <h2 className="text-base font-semibold">👥 팀 명단</h2>
          <span className="text-sm text-gray-500">{showMembers ? '숨기기 ▲' : '보기 ▼'}</span>
        </div>
        {showMembers && (
          <ul className="mt-3 flex flex-col gap-2 text-sm text-gray-700">
            {manager && (
              <li>👑 {manager.userName} ({manager.firstPosition}, {manager.secondPosition}, {manager.thirdPosition})</li>
            )}
            {teamUser.filter(u => u.userMail !== teamManagerMail).map(u => (
              <li key={u.userMail}>👤 {u.userName} ({u.firstPosition}, {u.secondPosition}, {u.thirdPosition})</li>
            ))}
          </ul>
        )}
      </div>

      {/* 팀 게시글 */}
      <TeamFeedList />

      {/* 경기 일정 */}
      <div>
        <h2 className="text-base font-semibold mb-4">📅 경기 일정</h2>
        {isInTeam ? (
          <TeamMatch games={games} teamManagerMail={teamManagerMail} />
        ) : (
          <TeamJoin />
        )}
      </div>
    </div>
  );
};

export default TeamInfo;

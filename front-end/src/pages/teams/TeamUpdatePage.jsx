import TeamUpdate from '../../components/teams/TeamUpdate';
import TeamMemberList from '../../components/teams/TeamMemberList';
import TeamSaveDelete from '../../components/teams/TeamSaveDelete';
import { useState } from 'react';

const TeamUpdatePage = () => {
  const [team, setTeam] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const teamId = sessionStorage.getItem('teamId');

  return (
    <div className="p-10 max-w-xl mx-auto bg-white min-h-screen">
      {/* 팀 정보 수정 */}
      <TeamUpdate team={team} setTeam= {setTeam} setLogoFile={setLogoFile} teamId={teamId} />

      {/* 팀원 관리 */}
      <TeamMemberList teamId={teamId} />

      {/* 저장 / 삭제 버튼 */}
      <TeamSaveDelete team={team} teamId={teamId} logoFile={logoFile} />
    </div>
  );
};

export default TeamUpdatePage;

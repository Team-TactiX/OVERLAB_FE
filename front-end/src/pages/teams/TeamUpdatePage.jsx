import { useEffect, useState } from 'react';
import TeamUpdate from '../../components/teams/TeamUpdate';
import TeamMemberList from '../../components/teams/TeamMemberList';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaTrash } from 'react-icons/fa';

const TeamUpdatePage = () => {
  const [team, setTeam] = useState(null);
  const teamId = sessionStorage.getItem('teamId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeam = async () => {
      const res = await fetch(`http://52.78.12.127:8080/api/teams/${teamId}`);
      const data = await res.json();
      setTeam(data);
    };
    fetchTeam();
  }, [teamId]);

  if (!team) return <div className="text-center py-10">로딩 중...</div>;

  const handleUpdate = async () => {
    const res = await fetch('http://52.78.12.127:8080/api/teams/update-team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(team),
    });

    if (res.ok) {
      alert('팀 정보 수정 완료');
      navigate(`/team/${teamId}`);
    } else {
      alert('수정 실패');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('정말 팀을 삭제하시겠습니까?')) return;

    const res = await fetch(`http://52.78.12.127:8080/api/teams/delete-team`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teamId: Number(teamId) }),
    });

    if (res.ok) {
      alert('삭제 완료');
      sessionStorage.removeItem('teamId');
      navigate('/main');
    } else {
      alert(await res.text());
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto bg-white min-h-screen">
      {/* 팀 정보 수정 */}
      <TeamUpdate team={team} />

      {/* 팀원 관리 */}
      <TeamMemberList teamId={teamId} />

      {/* 저장 / 삭제 버튼 */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <button
          onClick={handleUpdate}
          className="flex items-center gap-2 border border-blue-500 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-50"
        >
          <FaSave />
          팀 정보 저장
        </button>

        <button
          onClick={handleDelete}
          className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-full hover:bg-red-50"
        >
          <FaTrash />
          팀 삭제
        </button>
      </div>
    </div>
  );
};

export default TeamUpdatePage;

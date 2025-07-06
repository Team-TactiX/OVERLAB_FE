import { useNavigate } from 'react-router-dom';
import { FaSave, FaTrash } from 'react-icons/fa';

const TeamSaveDelete = ({ team, teamId, logoFile }) => {
  const navigate = useNavigate();

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
  }

  const handleUpdateLogo = async () => {
    if(logoFile) {
      const formData = new FormData();
      formData.append('file', logoFile); 

      const response = await fetch(`http://52.78.12.127:8080/api/teams/${teamId}/upload-logo`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        alert('수정 실패');
      }
    }
  }

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
    <div className="flex flex-wrap justify-center gap-4 mt-8">
        <button
          onClick={() => {
            handleUpdate()
            handleUpdateLogo()
          }}
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
  )
}

export default TeamSaveDelete;
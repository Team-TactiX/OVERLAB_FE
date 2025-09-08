import { useNavigate } from 'react-router-dom';

const TeamMember = ({ user, teamId, refreshUsers }) => {
  const userMail = sessionStorage.getItem('userMail');
  const navigate = useNavigate();

  const handleRemove = async () => {
    const res = await fetch(
      `http://52.78.12.127:8080/api/teams/${teamId}/remove-user`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMail: user.userMail }),
      },
    );
    if (res.ok) {
      alert('선수 방출 완료');
      refreshUsers();
    } else {
      alert(await res.text());
    }
  };

  const handlePromote = async () => {
    const res = await fetch(
      `http://52.78.12.127:8080/api/teams/${teamId}/transfer-manager`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentManagerMail: userMail,
          newManagerMail: user.userMail,
        }),
      },
    );
    if (res.ok) {
      alert('팀 매니저가 변경되었습니다.');
      navigate(`/team/${teamId}`);
    } else {
      alert(await res.text());
    }
  };

  return (
    // UserBox 스타일 적용
    <li className="flex justify-between items-center py-[1.2vh] px-[2vh] border-b border-[#ddd]">
      <div className="text-sm">
        {user.userName}
        <br />
        <span className="text-gray-500">{user.userMail}</span>
      </div>
      {/* ButtonBox 스타일 적용 */}
      <div className="flex gap-[1vh]">
        <button
          className="bg-black text-white text-xs px-3 py-1 rounded"
          onClick={handlePromote}
        >
          매니저 임명
        </button>
        <button
          className="bg-red-500 text-white text-xs px-3 py-1 rounded"
          onClick={handleRemove}
        >
          방출
        </button>
      </div>
    </li>
  );
};

export default TeamMember;

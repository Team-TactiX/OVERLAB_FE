import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const UserBox = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2vh 2vh;
  border-bottom: 1px solid #ddd;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 1vh;
`;

const TeamMember = ({ user, teamId, refreshUsers }) => {
  const userMail = sessionStorage.getItem('userMail');
  const navigate = useNavigate()

  const handleRemove = async () => {
    const res = await fetch(`http://52.78.12.127:8080/api/teams/${teamId}/remove-user`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userMail: user.userMail }),
    });
    if (res.ok) {
      alert('선수 방출 완료');
      refreshUsers();
    } else {
      alert(await res.text());
    }
  };

  const handlePromote = async () => {
    const res = await fetch(`http://52.78.12.127:8080/api/teams/${teamId}/transfer-manager`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentManagerMail: userMail, newManagerMail: user.userMail }),
    });
    if (res.ok) {
      alert('팀 매니저가 변경되었습니다.');
      navigate(`/team/${teamId}`)
    } else {
      alert(await res.text());
    }
  };

  return (
    <UserBox>
      <div className="text-sm">
        {user.userName}
        <br />
        <span className="text-gray-500">{user.userMail}</span>
      </div>
      <ButtonBox>
        <button className="bg-black text-white text-xs px-3 py-1 rounded" onClick={handlePromote}>매니저 임명</button>
        <button className="bg-red-500 text-white text-xs px-3 py-1 rounded" onClick={handleRemove}>
          방출
        </button>
      </ButtonBox>
    </UserBox>
  );
};

export default TeamMember;

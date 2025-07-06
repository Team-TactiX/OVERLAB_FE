import { useEffect, useState } from 'react';
import TeamMember from './TeamMember';

const TeamMemberList = ({ teamId }) => {
  const [users, setUsers] = useState([]);
  const userMail = sessionStorage.getItem('userMail');

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`http://52.78.12.127:8080/api/teams/${teamId}/users-in-team`);
      const data = await res.json();
      setUsers(data.filter((user) => user.userMail !== userMail));
    };
    fetchUsers();
  }, [teamId, userMail]);

  return (
    <>
      {/* 팀원 관리 */}
      <div className="w-full px-4">
  <h2 className="text-lg font-semibold mb-2">팀원 관리</h2>


  <ul>
    {users.map((user) => (
      <TeamMember
        key={user.userMail}
        user={user}
        teamId={teamId}
        refreshUsers={() => {
          fetch(`http://52.78.12.127:8080/api/teams/${teamId}/users-in-team`)
            .then((res) => res.json())
            .then((data) =>
              setUsers(data.filter((u) => u.userMail !== userMail))
            );
        }}
      />
    ))}
  </ul>
</div>
    </>
  );
};

export default TeamMemberList;

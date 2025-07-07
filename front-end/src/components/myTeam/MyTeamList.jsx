import MyTeam from './MyTeam';

const MyTeamList = ({ teams }) => {
  if (teams.length === 0) {
    return <div className="text-[1.6vh] text-center mt-[4vh]">참여 중인 팀이 없습니다.</div>;
  }

  return (
    <div className="flex flex-col gap-[1vh]">
      {teams.map((team, index) => (
        <MyTeam key={index} team={team} />
      ))}
    </div>
  );
};

export default MyTeamList;

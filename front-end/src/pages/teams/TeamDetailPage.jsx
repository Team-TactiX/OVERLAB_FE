import { useParams } from 'react-router-dom';
import TeamInfo from '../../components/teams/TeamInfo';

const TeamDetailPage = () => {
  const { teamId } = useParams();
  sessionStorage.setItem('teamId', teamId);

  return (
    // PageWrapper 스타일 적용
    <div className="p-[8vh] px-[2vh] pb-[2vh] bg-gray-50 min-h-screen">
      <TeamInfo teamId={teamId} />
    </div>
  );
};

export default TeamDetailPage;

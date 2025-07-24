import { useParams } from 'react-router-dom';
import UserFeedDetail from '../../components/profile/UserFeedDetail';

const UserFeedPage = () => {
  const { feedId } = useParams();

  return (
    <>
      <p>게시글</p>
      <UserFeedDetail feedId={feedId} />
    </>
  );
};

export default UserFeedPage;

import { useParams } from 'react-router-dom';
import UserFeedDetail from '../../components/profile/UserFeedDetail';

const UserFeedPage = () => {
  const { userFeedId } = useParams();

  return (
    <>
      <p>게시글</p>
      <UserFeedDetail userFeedId={userFeedId} />
    </>
  );
};

export default UserFeedPage;

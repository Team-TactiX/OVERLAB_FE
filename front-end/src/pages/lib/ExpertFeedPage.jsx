import { useParams } from 'react-router-dom';
import ExpertFeedDetail from '../../components/lib/ExpertFeedDetail';

const ExpertFeedPage = () => {
  const { feedId } = useParams();

  return (
    <>
      <p>게시글</p>
      <ExpertFeedDetail feedId={feedId} />
    </>
  );
};

export default ExpertFeedPage;

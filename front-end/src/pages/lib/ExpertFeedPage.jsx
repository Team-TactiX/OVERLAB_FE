import { useParams } from 'react-router-dom';
import ExpertFeedDetail from '../../components/lib/ExpertFeedDetail';

const ExpertFeedPage = () => {
  const { expertFeedId } = useParams();

  return (
    <>
      <p>게시글</p>
      <ExpertFeedDetail expertFeedId={expertFeedId} />
    </>
  );
};

export default ExpertFeedPage;

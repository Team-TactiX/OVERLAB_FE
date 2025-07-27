import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ExpertFeed from './ExpertFeed';

const GridContainer = styled.div`
  max-width: 100vw;
  margin: 2rem auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  justify-content: center;
  gap: 1.8rem;
  padding: 0 1rem;
`;

const ExpertFeedList = () => {
  const [expertFeedList, setExpertFeedList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          'http://52.78.12.127:8080/api/users/files/expert',
        );
        if (!res.ok) throw new Error('Fetch error');
        const data = await res.json();
        setExpertFeedList(data);
      } catch (e) {
        console.error(e);
        setExpertFeedList([]);
      }
    }
    fetchData();
  }, []);

  return (
    <GridContainer>
      {expertFeedList.map((feed) => (
        <ExpertFeed key={feed.fileId} expertFeed={feed} />
      ))}
    </GridContainer>
  );
};

export default ExpertFeedList;

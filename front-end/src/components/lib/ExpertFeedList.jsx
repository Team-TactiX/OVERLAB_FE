import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ExpertFeed from './ExpertFeed';

const GridContainer = styled.div`
  display: grid;
  gap: 2vh;
  justify-items: center;
  width: 100%;
`;

const ExpertFeedList = () => {
  const [expertFeedList, setExpertFeedList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://52.78.12.127:8080/api/users/files/expert`,
      );
      const data = await res.json();
      setExpertFeedList(data);
    };
    fetchData();
  }, []);

  return (
    <GridContainer>
      {expertFeedList.map((expertFeed) => (
        <ExpertFeed key={expertFeed.fileId} expertFeed={expertFeed} />
      ))}
    </GridContainer>
  );
};

export default ExpertFeedList;

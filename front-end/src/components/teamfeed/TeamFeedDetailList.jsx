import { useEffect, useState } from 'react';
import TeamFeedDetail from './TeamFeedDetail';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12vh, 1fr));
  gap: 2vh;
  justify-items: center;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 1rem;
  text-align: ;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const TeamFeedDetailList = ({ teamId }) => {
  const [teamFeedList, setTeamFeedList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://52.78.12.127:8080/api/files/team/${teamId}`
      );
      const data = await res.json();
      setTeamFeedList(data);
    };
    fetchData();
  }, [teamId]);

  return (
    <>
      <Title>팀 게시글 리스트</Title>
      <GridContainer>
        {teamFeedList.map((teamFeed) => (
          <TeamFeedDetail key={teamFeed.fileId} teamFeed={teamFeed} />
        ))}
      </GridContainer>
    </>
  );
};

export default TeamFeedDetailList;

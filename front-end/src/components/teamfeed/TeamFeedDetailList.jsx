import { useEffect, useState } from 'react';
import TeamFeedDetail from './TeamFeedDetail';
import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12vh, 1fr));
  gap: 2vh;
  justify-items: center;
`;

const TeamFeedDetailList = ({ teamId }) => {
  const [teamFeedList, setTeamFeedList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://52.78.12.127:8080/api/files/team/${teamId}`);
      const data = await res.json();
      setTeamFeedList(data);
      console.log(data)
    };
    fetchData();

  }, [teamId]);


  return (
    <>
    <h2>팀 상세 리스트</h2>
    <GridContainer>
      {teamFeedList.map((teamFeed) => (
        <TeamFeedDetail key={teamFeed.fileId} teamFeed={teamFeed} />
      ))}
    </GridContainer>
  </>
  );
};

export default TeamFeedDetailList;

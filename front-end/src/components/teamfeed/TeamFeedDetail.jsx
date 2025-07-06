import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 12vh;
  height: 20vh;
  background-color: #f9f9f9;
  text-align: center;
  flex-shrink: 0;
  border-radius: 0.8vh;
  box-shadow: 0 0.2vh 0.4vh rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 1.4vh;
  margin: 1vh 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledImg = styled.img`
  width: 10vh;
  height: 10vh;
  object-fit: cover;
  border-radius: 0.4vh;
`;

const StyledVideo = styled.video`
  width: 10vh;
  height: 10vh;
  object-fit: cover;
  border-radius: 0.4vh;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamFeedDetail = ({ teamFeed }) => {
  return (
    <Container>
      <StyledLink to={`/teamfeed/${teamFeed.fileId}`}>
        <Title>{teamFeed.title}</Title>
        {teamFeed.fileType.startsWith('image/') ? (
          <StyledImg src={`http://52.78.12.127:8080/media/${teamFeed.realFileName}`} alt={teamFeed.fileType} />
        ) : teamFeed.fileType.startsWith('video/') ? (
          <StyledVideo src={`http://52.78.12.127:8080/media/${teamFeed.realFileName}`} controls />
        ) : (
          <span>지원되지 않는 파일</span>
        )}
      </StyledLink>
    </Container>
  );
};

export default TeamFeedDetail;

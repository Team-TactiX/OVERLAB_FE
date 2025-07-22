import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useUser from '../../hooks/api/get/useUser';

const Container = styled.div`
  width: 100%;
  height: 20vh;
  background-color: white;
  flex-shrink: 0;
  border-radius: 12px;
  box-shadow: 0 0.2vh 0.4vh rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 16px;
  margin: 0.3vh 1vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 14vh;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
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
`;

const Content = styled.p`
  margin: 0 1vw;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ExpertFeed = ({ expertFeed }) => {
  const userId = expertFeed.userId;
  const { user } = useUser({ userId });

  return (
    <Container>
      <StyledLink to={`/expertfeed/${expertFeed.fileId}`}>
        {expertFeed.fileType.startsWith('image/') ? (
          <StyledImg
            src={`http://52.78.12.127:8080/media/user/${expertFeed.realFileName}`}
            alt={expertFeed.fileType}
          />
        ) : expertFeed.fileType.startsWith('video/') ? (
          <StyledVideo
            src={`http://52.78.12.127:8080/media/user/${expertFeed.realFileName}`}
            controls
          />
        ) : (
          <span>지원되지 않는 파일</span>
        )}
        <Box>
          <Title>{expertFeed.title}</Title>
          <Content>{user.userName}</Content>
        </Box>
        <Content>{expertFeed.content}</Content>
      </StyledLink>
    </Container>
  );
};

export default ExpertFeed;

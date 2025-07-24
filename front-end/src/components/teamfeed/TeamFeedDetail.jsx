import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  width: 100%;
  max-width: 240px;
  background-color: #fdfdfd;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  color: inherit;
  text-decoration: none;
`;

const MediaWrapper = styled.div`
  width: 100%;
  height: 160px;
  overflow: hidden;
  position: relative;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  ${Card}:hover & img,
  ${Card}:hover & video {
    transform: scale(1.05);
  }
`;

const TitleBox = styled.div`
  padding: 1rem;
  background-color: #fff;
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: #333;
  text-align: center;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 2줄까지 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TeamFeedDetail = ({ teamFeed }) => {
  const mediaUrl = `http://52.78.12.127:8080/media/team/${teamFeed.realFileName}`;

  return (
    <Card>
      <StyledLink to={`/teamfeed/${teamFeed.fileId}`}>
        <MediaWrapper>
          {teamFeed.fileType.startsWith('image/') ? (
            <img src={mediaUrl} alt={teamFeed.title} />
          ) : teamFeed.fileType.startsWith('video/') ? (
            <video src={mediaUrl} muted playsInline loop />
          ) : (
            <div style={{ padding: '2rem', fontSize: '0.9rem', color: '#888' }}>
              지원되지 않는 형식
            </div>
          )}
        </MediaWrapper>
        <TitleBox>
          <Title>{teamFeed.title}</Title>
        </TitleBox>
      </StyledLink>
    </Card>
  );
};

export default TeamFeedDetail;

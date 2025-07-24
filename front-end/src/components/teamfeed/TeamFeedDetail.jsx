import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaHeart, FaComment } from 'react-icons/fa';
import { useState } from 'react';

const Card = styled.div`
  width: 100%;
  max-width: 280px;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 6px 12px rgba(0,0,0,0.06);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 14px 28px rgba(0,0,0,0.12);
  }
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MediaWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  flex-shrink: 0;

  img, video {
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

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0; right: 0;
  padding: 6px 10px;
  background: linear-gradient(transparent, rgba(0,0,0,0.6));
  color: white;
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
`;

const Content = styled.div`
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 0.4rem 0;
  color: #222;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Excerpt = styled.p`
  font-size: 0.9rem;
  color: #555;
  line-height: 1.4;
  margin: 0 0 1rem 0;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AuthorDate = styled.div`
  font-size: 0.8rem;
  color: #888;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;

const scaleUp = keyframes`
  0% { transform: scale(1);}
  50% { transform: scale(1.3);}
  100% { transform: scale(1);}
`;

const ActionBtn = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  color: ${props => (props.$active ? '#e0245e' : '#888')};
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => (props.$active ? '#c21' : '#555')};
  }

  & > svg {
    margin-right: 6px;
    ${props => props.$active && `animation: ${scaleUp} 0.5s ease;`}
  }
`;

const Tags = styled.div`
  margin-top: 0.8rem;
  font-size: 0.75rem;
  color: #666;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  span {
    background: #eee;
    padding: 2px 8px;
    border-radius: 12px;
    user-select: none;
  }
`;

const TeamFeedDetail = ({ teamFeed }) => {
  const [liked, setLiked] = useState(false);
  const mediaUrl = `http://52.78.12.127:8080/media/team/${teamFeed.realFileName}`;
  const date = new Date(teamFeed.createdAt).toLocaleDateString();
  const excerpt = teamFeed.description || '';

  return (
    <Card>
      <StyledLink to={`/teamfeed/${teamFeed.fileId}`}>
        <MediaWrapper>
          {teamFeed.fileType.startsWith('image/') ? (
            <img src={mediaUrl} alt={teamFeed.title} />
          ) : teamFeed.fileType.startsWith('video/') ? (
            <video src={mediaUrl} muted playsInline loop />
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>
              지원되지 않는 형식
            </div>
          )}
          <Overlay>
            <span>{teamFeed.authorName}</span>
            
          </Overlay>
        </MediaWrapper>
        <Content>
          <Title title={teamFeed.title}>{teamFeed.title}</Title>
          {excerpt && <Excerpt>{excerpt}</Excerpt>}
          <MetaRow>
            <AuthorDate>{teamFeed.authorName}</AuthorDate>
            <Actions>
              <ActionBtn
                $active={liked}
                onClick={e => {
                  e.preventDefault();
                  setLiked((prev) => !prev);
                }}
              >
                <FaHeart /> {liked ? teamFeed.likes + 1 : teamFeed.likes}
              </ActionBtn>
              <ActionBtn $active={false}>
                <FaComment /> {teamFeed.comments}
              </ActionBtn>
            </Actions>
          </MetaRow>
          {teamFeed.tags && teamFeed.tags.length > 0 && (
            <Tags>
              {teamFeed.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </Tags>
          )}
        </Content>
      </StyledLink>
    </Card>
  );
};

export default TeamFeedDetail;

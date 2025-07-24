import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useUser from '../../hooks/api/get/useUser';

const Card = styled.div`
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  }
`;

const Thumbnail = styled.div`
  height: 180px;
  background: #f1f3f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #888;
  overflow: hidden;
`;

const ThumbImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ThumbVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1rem 1.2rem;
  display: flex;
  flex-direction: column;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #222;
  margin: 0;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProfileButton = styled.button`
  background: #10b981;
  color: #fff;
  border: none;
  font-size: 0.75rem;
  padding: 6px 10px;
  border-radius: 0.5rem;
  margin-left: 8px;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    background: #059669;
  }
`;

const AuthorInfo = styled.div`
  margin: 0.6rem 0;
  font-size: 0.85rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 6px;
  &::before {
    content: '👨‍🏫';
  }
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #444;
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ExpertFeed = ({ expertFeed }) => {
  const { user } = useUser({ userId: expertFeed.userId });

  return (
    <Link to={`/expertfeed/${expertFeed.fileId}`} style={{ textDecoration: 'none' }}>
      <Card>
        <Thumbnail>
          {expertFeed.fileType.startsWith('image/') ? (
            <ThumbImage
              src={`http://52.78.12.127:8080/media/user/${expertFeed.realFileName}`}
              alt={expertFeed.title}
            />
          ) : expertFeed.fileType.startsWith('video/') ? (
            <ThumbVideo
              src={`http://52.78.12.127:8080/media/user/${expertFeed.realFileName}`}
              muted
              playsInline
            />
          ) : (
            <span>📁 미디어 없음</span>
          )}
        </Thumbnail>
        <Content>
          <TitleRow>
            <Title>{expertFeed.title}</Title>
            <ProfileButton onClick={(e) => {
              e.preventDefault();
              window.location.href = `/profile/${expertFeed.userId}`;
            }}>
              프로필
            </ProfileButton>
          </TitleRow>
          <AuthorInfo>{user?.userName || '익명 전문가'}</AuthorInfo>
          <Description>{expertFeed.content}</Description>
        </Content>
      </Card>
    </Link>
  );
};

export default ExpertFeed;

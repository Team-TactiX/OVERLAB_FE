import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useUser from '../../hooks/api/get/useUser';
import { useEffect } from 'react';

const Card = styled.div`
  background: #fff;
  border-radius: 0;
  border: 1px solid #e5e5e5;
  overflow: hidden;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const Thumbnail = styled.div`
  height: 180px;
  background: #f1f3f5;
  display: flex;
  align-items: center;
  justify-content: center;
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
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #222;
  margin: 0;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProfileButton = styled.button`
  background: #10b981;
  color: #fff;
  border: none;
  font-size: 0.75rem;
  padding: 6px 12px;
  border-radius: 999px;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    background: #059669;
  }
`;

const AuthorInfo = styled.div`
  margin: 12px 0 8px;
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
  font-size: 0.9rem;
  color: #444;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ExpertFeed = ({ expertFeed }) => {
  const { user, fetchUser } = useUser();

  useEffect(() => {
    fetchUser(expertFeed.userId);
  }, [expertFeed]);

  return (
    <Link
      to={`/expertfeed/${expertFeed.fileId}`}
      style={{ textDecoration: 'none' }}
    >
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
            <ProfileButton
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/profile/${expertFeed.userId}`;
              }}
            >
              전문가 프로필 보기
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

import styled from 'styled-components';
import TeamFeed from './TeamFeed';
import alt_image from '../../img/alt_image.png'
import { Link, useParams } from 'react-router-dom';

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const SectionName = styled.h1`
  font-size: 2vh;
`;

const FeedSection = styled.div`
  display: flex;
  gap: 2vw;
  width: 100%;
  overflow-x: scroll;
`

const teamFeedList = [
  { id: 1, title: '첫 번째 게시글', img: alt_image },
  { id: 2, title: '두 번째 게시글', img: alt_image },
  { id: 2, title: '두 번째 게시글', img: alt_image },
  { id: 2, title: '두 번째 게시글', img: alt_image },
  { id: 2, title: '두 번째 게시글', img: alt_image },
  { id: 2, title: '두 번째 게시글', img: alt_image },
  { id: 2, title: '두 번째 게시글', img: alt_image },
  { id: 2, title: '두 번째 게시글', img: alt_image },
  // 필요한 만큼 데이터 추가
];

const TeamFeedList = () => {
  const {teamId} = useParams();
  return (
    <>
    <TitleContainer>
      <SectionName>팀 게시글 목록</SectionName>
      <Link to={`/teamfeed/list/${teamId}`}>게시글 전체보기</Link>
    </TitleContainer>
      <FeedSection>
        {teamFeedList.map((teamFeed) => (
          <TeamFeed key={teamFeed.id} id={teamFeed.id} teamFeed={teamFeed} />
        ))}
      </FeedSection>
    </>
  );
};

export default TeamFeedList;

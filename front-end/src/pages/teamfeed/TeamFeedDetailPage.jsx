import { useParams } from "react-router-dom";
import styled from "styled-components";
import TeamFeedDetailInfo from "../../components/teamfeed/TeamFeedDetailInfo";

const Container = styled.div`
  margin-top: 9vh;
  padding: 0 1vh;
  margin-bottom: 5vh;
`;

const Section = styled.div`
  padding: 0  rem;
`;

// 여기에 글자 스타일만 추가
const PageTitle = styled.h2`
font-size: 2rem;
font-weight: 700;
color: #222;
margin-bottom: 0.5rem;
text-align:center;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  height: 2px;
  background-color: #e0e0e0;
  margin-bottom: 1rem;
`;

const TeamFeedDetailPage = () => {
  const { teamFeedId } = useParams();

  return (
    <Container>
      <div>
      <PageTitle>팀 게시글 상세 페이지</PageTitle>
      <Divider/>
      </div>
      <Section>
        <TeamFeedDetailInfo teamFeedId={teamFeedId} />
      </Section>
    </Container>
  );
};

export default TeamFeedDetailPage;

import { useParams } from "react-router-dom";
import styled from "styled-components";
import TeamInfo from "../../components/teamfeed/TeamInfo";
import TeamFeedDetailList from "../../components/teamfeed/TeamFeedDetailList";

const PageWrapper = styled.div`
  margin-top: 9vh;
  padding: 0 2vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 0.5rem;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  height: 2px;
  background-color: #e0e0e0;
  margin-bottom: 1rem;
`;

const CardSection = styled.section`
  background-color: #fff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`;

const TeamFeedListPage = () => {
  const { teamId } = useParams();

  return (
    <PageWrapper>
      <ContentWrapper>
        <div>
          <Title>팀 게시글</Title>
          <Divider />
        </div>

        <CardSection>
          <TeamInfo teamId={teamId} />
        </CardSection>

        <CardSection>
          <TeamFeedDetailList teamId={teamId} />
        </CardSection>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default TeamFeedListPage;

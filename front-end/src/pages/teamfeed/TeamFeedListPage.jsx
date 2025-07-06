import { useParams } from "react-router-dom";
import styled from "styled-components";
import TeamInfo from "../../components/teamfeed/TeamInfo";
import TeamFeedDetailList from "../../components/teamfeed/TeamFeedDetailList";

const Container = styled.div`
  margin-top: 9vh;
  display: flex;
  gap: 2vh;
  flex-direction: column;
`

const Section = styled.div`
  background-color: white;
`

const TeamFeedListPage = () => {
  const {teamId} = useParams()

  return (
    <Container>
      <h2>팀 게시글 리스트 페이지</h2>
      <Section>
        <TeamInfo teamId={teamId} />
      </Section>
      <Section>
        <TeamFeedDetailList teamId={teamId} />
      </Section>
    </Container>
  )
}

export default TeamFeedListPage;
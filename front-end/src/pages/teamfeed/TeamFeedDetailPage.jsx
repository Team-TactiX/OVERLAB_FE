import { useParams } from "react-router-dom"
import styled from "styled-components";
import TeamFeedDetailInfo from "../../components/teamfeed/TeamFeedDetailInfo";

const Container = styled.div`
  margin-top: 9vh;
`
const Section = styled.div`
  background-color: white;
`

const TeamFeedDetailPage = () => {
  const {teamFeedId} = useParams();
  
  return (
    <Container>
      <>팀 게시글 상세 페이지</>
      <Section>
        <TeamFeedDetailInfo teamFeedId={teamFeedId} />
      </Section>
    </Container>
  )
}

export default TeamFeedDetailPage;
import { useParams } from "react-router-dom"
import styled from "styled-components";

const Container = styled.div`
  margin-top: 9vh;
`

const TeamFeedDetailPage = () => {
  const {teamFeedId} = useParams();
  return (
    <Container>
      <>팀 게시글 상세 페이지</>
      <>{teamFeedId}</>
    </Container>
  )
}

export default TeamFeedDetailPage;
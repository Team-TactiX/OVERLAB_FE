import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 9vh;
`

const TeamFeedListPage = () => {
  const {teamId} = useParams()

  return (
    <Container>
      <>팀 게시글 리스트 페이지</>
      <>{teamId}</>
    </Container>
  )
}

export default TeamFeedListPage;
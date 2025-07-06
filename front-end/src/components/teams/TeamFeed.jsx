import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Containder = styled.div`
  width: 12vh;
  height: 20vh;
  background-color: #f9f9f9;
  text-align: center;
  flex-shrink: 0;
`

const Title = styled.h1`
  font-size: 1.4vh;
`

const StyledImg = styled.img`
  margin-left: 1vh;
  width: 10vh;
  height: 10vh;
`

const TeamFeed = ({ teamFeed }) => {
  return (
    <Containder>
      <Link to={`/teamfeed/${teamFeed.id}`}>
        <Title>{teamFeed.title}</Title>
        <StyledImg src={teamFeed.img} />
      </Link>
    </Containder>
  )
}

export default TeamFeed;
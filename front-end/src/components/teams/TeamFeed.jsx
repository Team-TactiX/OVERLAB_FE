import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 220px;
  background-color: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 10px;
  overflow: hidden;
`;

const StyledImg = styled.img`
  width: 50%;
  height: 50%;
  object-fit: cover;
  display: block;
`;

const Title = styled.h2`
  font-size: 4rem;
  font-weight: 600;
  padding: 0.75rem 1rem;
  color: #333;
  text-align: center;
`;

const TeamFeed = ({ teamFeed }) => {
  return (
    <Link to={`/teamfeed/${teamFeed.id}`}>
      <Container>
        <ImageWrapper>
          <StyledImg src={teamFeed.img} alt={teamFeed.title} />
        </ImageWrapper>
        <Title>{teamFeed.title}</Title>
      </Container>
    </Link>
  );
};

export default TeamFeed;

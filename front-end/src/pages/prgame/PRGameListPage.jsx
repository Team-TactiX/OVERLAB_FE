import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PRGameList from '../../components/prgame/PRGameList';

const PRGamesListPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 8vh;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  width: 70%;
  height: 5.5vh;
  background-color: black;
  color: white;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  border: 1px solid black;
`;

const PRGameListPage = () => {
  const { gameId } = useParams();
  return (
    <PRGamesListPageContainer>
      <PRGameList />
      <StyledLink to={`/pr/create/${gameId}`}>포메이션 생성</StyledLink>
    </PRGamesListPageContainer>
  );
};

export default PRGameListPage;

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

const PRGamesListBox = styled.div``;

const PRGameBox = styled(Link)`
  height: 6vh;
  width: 90%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 2vh 5%;
  background: #eee;
  text-decoration: none;
  border-radius: 6px;
`;

const PRGameTitle = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  margin-left: 1vh;
  color: black;
`;

const StyledButton = styled.button`
  width: 7vh;
  height: 4vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  border-radius: 6px;
  border: 1px solid black;
  &:hover {
    background-color: pink;
  }
`;

const PRGameList = () => {
  const { gameId } = useParams();
  const userMail = sessionStorage.getItem('userMail');
  const [data, setData] = useState([]);
  const [prGameData, setPRGameData] = useState([]);
  const [teamManagerMail, setTeamManagerMail] = useState(null)

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await fetch(`/api/pr-games/findByGameId/${gameId}`);
        const response = await fetch(`/api/games/saved-formation/${gameId}`);
        if (!res.ok || !response.ok) {
          throw new Error('서버 응답 오류');
        }
        const prGameData = await res.json();
        const gameData = await response.json();

        setTeamManagerMail(gameData.team.teamManager.userMail)
        setPRGameData(prGameData);

      } catch (err) {
        console.error('PRGame 불러오기 오류:', err);
      }
    };

    if (gameId) fetchGame();
  }, [gameId]);

  useEffect(() => {
    const filteredData = userMail !== teamManagerMail ? prGameData.filter((game) => game.user.userMail === userMail) : prGameData;
    setData(filteredData)
  }, [prGameData])
  
  
  const handleDeleteGame = async (prGameId) => {
    try {
      const res = await fetch(`/api/pr-games/remove/${prGameId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('삭제 성공!');
        window.location.reload();
      } else {
        console.error(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) return <p>... 로딩중 ...</p>;

  return (
      <PRGamesListBox>
        {data.map((game, index) => (
          <PRGameBox
            key={index}
            to={{
              pathname: `/pr/${game.prGameId}`,
              state: { prGame: game },
            }}
          >
            <PRGameTitle>{game.prGameName}</PRGameTitle>
            <StyledButton
              style={{ marginRight: '1vh' }}
              onClick={(e) => {
                e.preventDefault(); // 링크 이동 방지
                handleDeleteGame(game.prGameId);
              }}
            >
              🗑️
            </StyledButton>
          </PRGameBox>
        ))}
      </PRGamesListBox>

  );
};

export default PRGameList;

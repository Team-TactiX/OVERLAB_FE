import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const usePRGameData = () => {
  const { prGameId } = useParams();
  const gameId = sessionStorage.getItem('gameId');
  const [game, setGame] = useState(null);
  const [prGame, setPRGame] = useState(null);
  const [users, setUsers] = useState([]);
  const [teamId, setTeamId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await fetch(
          `http://52.78.12.127:8080/api/pr-games/findByPRGameId/${prGameId}`,
        );
        const data = await res.json();
        setPRGame(data);
        setTeamId(data.team?.teamId || null);

        const response = await fetch(
          `http://52.78.12.127:8080/api/games/saved-formation/${gameId}`,
        );
        const gameData = await response.json();

        setGame(gameData);
        setUsers(gameData.playersMail || []);
      } catch (err) {
        console.error('게임 데이터를 불러오는 중 오류 발생:', err);
      } finally {
        setLoading(false);
      }
    };

    if (prGameId) fetchGame();
  }, [prGameId, gameId]);

  return { game, prGame, users, teamId, loading, setGame, setPRGame, setUsers };
};

export default usePRGameData;

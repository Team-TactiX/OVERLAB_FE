import { useEffect, useState } from 'react';

const useGameData = () => {
  const gameId = sessionStorage.getItem('gameId');
  const [game, setGame] = useState(null);
  const [users, setUsers] = useState([]);
  const [teamId, setTeamId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await fetch(`/api/games/saved-formation/${gameId}`);
        const data = await res.json();
        setGame(data);
        setUsers(data.playersMail || []);
        setTeamId(data.team?.teamId || null);
      } catch (err) {
        console.error('게임 데이터를 불러오는 중 오류 발생:', err);
      } finally {
        setLoading(false);
      }
    };

    if (gameId) fetchGame();
  }, [gameId]);

  return { game, users, teamId, loading, setGame, setUsers };
};

export default useGameData;

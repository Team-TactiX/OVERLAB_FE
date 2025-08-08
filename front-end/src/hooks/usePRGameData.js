import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { positionList } from '../constants/positionList';
const baseURL = import.meta.env.VITE_API_BASE_URL;

const usePRGameData = () => {
  const { prGameId } = useParams();
  const gameId = sessionStorage.getItem('gameId');
  const [game, setGame] = useState(null);
  const [prGame, setPRGame] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCount = () => {
    if (!game) return 0;

    return positionList.filter(
      (pos) => game[pos.key] !== null && game[pos.key] !== undefined,
    ).length;
  };

  const getPRCount = () => {
    if (!prGame) return 0;

    return positionList.filter(
      (pos) => prGame[pos.key] !== null && prGame[pos.key] !== undefined,
    ).length;
  };

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await fetch(
          `${baseURL}/api/pr-games/findByPRGameId/${prGameId}`,
        );
        if (!res.ok) throw new Error('PR 게임 API 실패');
        const data = await res.json();
        setPRGame(data);

        const response = await fetch(
          `${baseURL}/api/quarters/saved-formation/${gameId}`,
        );
        const quarterData = await response.json();
        setGame(quarterData);
        setUsers(quarterData.playersMail || []);
      } catch (err) {
        console.error('게임 데이터를 불러오는 중 오류 발생:', err);
      } finally {
        setLoading(false);
      }
    };

    if (prGameId) fetchGame();
  }, [prGameId, gameId]);

  return {
    game,
    prGame,
    users,
    loading,
    setGame,
    setPRGame,
    setUsers,
    getCount,
    getPRCount,
    positionList,
  };
};

export default usePRGameData;

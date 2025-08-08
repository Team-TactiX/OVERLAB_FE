import { useEffect, useState } from 'react';
import useFetchQuarters from './api/get/useFetchQuarters';
import { positionList } from '../constants/positionList';
const baseURL = import.meta.env.VITE_API_BASE_URL;

const useGameData = ({ gameId }) => {
  const [game, setGame] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuarter, setSelectedQuarter] = useState('');
  const currentQuarterIndex = Number(selectedQuarter) - 1;
  const [currentQuarter, setCurrentQuarter] = useState(null);
  const [team, setTeam] = useState('');
  const { quarters, setQuarters, fetchQuarters } = useFetchQuarters({
    gameId,
  });

  const getCount = () => {
    if (!currentQuarter) return 0;

    return positionList.filter(
      (pos) =>
        currentQuarter[pos.key] !== null &&
        currentQuarter[pos.key] !== undefined,
    ).length;
  };

  useEffect(() => {
    if (!gameId) return;

    const fetchGame = async () => {
      try {
        const res = await fetch(`${baseURL}/api/games/game/${gameId}`);
        const data = await res.json();
        setGame(data);
      } catch (err) {
        console.error('게임 데이터를 불러오는 중 오류 발생:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuarters({ gameId });

    fetchGame();
  }, [gameId]);

  useEffect(() => {
    const fetchSelectedQuarters = async () => {
      if (quarters.length > 0) {
        setSelectedQuarter(quarters[0].quarter);
        setCurrentQuarter(quarters[0]);
      }
    };

    fetchSelectedQuarters();
  }, [quarters]);

  useEffect(() => {
    if (!currentQuarter) return;

    const fetchUsers = () => {
      setUsers(currentQuarter.playersMail);
    };

    fetchUsers();
  }, [currentQuarter]);

  useEffect(() => {
    if (!game) return;
    const fetchTeam = async () => {
      try {
        const response = await fetch(`${baseURL}/api/teams/${game.teamId}`);
        const data = await response.json();
        setTeam(data);
      } catch (err) {
        alert('서버 오류 발생');
        console.error(err);
      }
    };

    fetchTeam();
  }, [game]);

  return {
    game,
    users,
    loading,
    setGame,
    setUsers,
    positionList,
    getCount,
    quarters,
    setQuarters,
    selectedQuarter,
    setSelectedQuarter,
    currentQuarter,
    setCurrentQuarter,
    currentQuarterIndex,
    team,
  };
};

export default useGameData;

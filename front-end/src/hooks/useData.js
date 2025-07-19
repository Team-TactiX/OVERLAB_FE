import { useEffect, useState } from 'react';
import { positionList } from '../constants/positionList';

const useData = ({ quarterId }) => {
  const [gameId, setGameId] = useState('');
  const [quarter, setQuarter] = useState([]);
  const [quarters, setQuarters] = useState([]);
  const [game, setGame] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuarter, setSelectedQuarter] = useState('');
  const currentQuarterIndex = Number(selectedQuarter) - 1;
  const [currentQuarter, setCurrentQuarter] = useState(null);
  const [team, setTeam] = useState('');

  useEffect(() => {
    const fetchQuarter = async () => {
      try {
        const response = await fetch(
          `http://52.78.12.127:8080/api/quarters/saved-formation/${quarterId}`,
        );
        const data = await response.json();
        if (response.ok) {
          setQuarter(data);
        } else {
          alert('쿼터 패치 중 오류 발생');
          console.error(data);
        }
      } catch (err) {
        alert('서버 오류 발생');
        console.error(err);
      }
    };

    fetchQuarter();
  }, [quarterId]);

  useEffect(() => {
    setGameId(quarter.gameId);
  }, [quarter]);

  useEffect(() => {
    const fetchQuarters = async () => {
      if (!gameId) return;

      try {
        const response = await fetch(
          `http://52.78.12.127:8080/api/quarters/getQuarterList/${gameId}`,
        );
        const data = await response.json();
        if (response.ok) {
          setQuarters(data);
        } else {
          alert('쿼터 목록 패치 중 오류 발생');
          console.error(data);
        }
      } catch (err) {
        alert('서버 오류 발생');
        console.error(err);
      }
    };
    fetchQuarters();
  }, [gameId]);
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
        const res = await fetch(
          `http://52.78.12.127:8080/api/games/game/${gameId}`,
        );
        const data = await res.json();
        setGame(data);
      } catch (err) {
        console.error('게임 데이터를 불러오는 중 오류 발생:', err);
      } finally {
        setLoading(false);
      }
    };

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
        const response = await fetch(
          `http://52.78.12.127:8080/api/teams/${game.teamId}`,
        );
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
    setGame,
    setUsers,
    positionList,
    getCount,
    currentQuarter,
    setCurrentQuarter,
    team,
  };
};

export default useData;

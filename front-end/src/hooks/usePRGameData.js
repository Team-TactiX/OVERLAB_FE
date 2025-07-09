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

  const positionList = [
    { key: 'stId', label: 'ST', top: '1vh', left: '22.3vh' },
    { key: 'lsId', label: 'LS', top: '3vh', left: '14.3vh' },
    { key: 'rsId', label: 'RS', top: '3vh', left: '30.3vh' },
    { key: 'lwId', label: 'LW', top: '6vh', left: '6.3vh' },
    { key: 'cfId', label: 'CF', top: '6vh', left: '22.3vh' },
    { key: 'rwId', label: 'RW', top: '6vh', left: '38.3vh' },
    { key: 'lamId', label: 'LAM', top: '12vh', left: '14.3vh' },
    { key: 'camId', label: 'CAM', top: '13vh', left: '22.3vh' },
    { key: 'ramId', label: 'RAM', top: '12vh', left: '30.3vh' },
    { key: 'lmId', label: 'LM', top: '18vh', left: '6.3vh' },
    { key: 'lcmId', label: 'LCM', top: '18vh', left: '14.3vh' },
    { key: 'cmId', label: 'CM', top: '18vh', left: '22.3vh' },
    { key: 'rcmId', label: 'RCM', top: '18vh', left: '30.3vh' },
    { key: 'rmId', label: 'RM', top: '18vh', left: '38.3vh' },
    { key: 'lwbId', label: 'LWB', top: '24vh', left: '6.3vh' },
    { key: 'ldmId', label: 'LDM', top: '24vh', left: '14.3vh' },
    { key: 'cdmId', label: 'CDM', top: '24vh', left: '22.3vh' },
    { key: 'rdmId', label: 'RDM', top: '24vh', left: '30.3vh' },
    { key: 'rwbId', label: 'RWB', top: '24vh', left: '38.3vh' },
    { key: 'lbId', label: 'LB', top: '30vh', left: '6.3vh' },
    { key: 'lcbId', label: 'LCB', top: '30vh', left: '14.3vh' },
    { key: 'swId', label: 'SW', top: '30vh', left: '22.3vh' },
    { key: 'rcbId', label: 'RCB', top: '30vh', left: '30.3vh' },
    { key: 'rbId', label: 'RB', top: '30vh', left: '38.3vh' },
    { key: 'gkId', label: 'GK', top: '36vh', left: '22.3vh' },
  ];

  const getCount = () => {
    if (!game) return 0;

    return positionList.filter(
      (pos) => game[pos.key] !== null && game[pos.key] !== undefined,
    ).length;
  };

  const getPRCount = () => {
    if (!game) return 0;

    return positionList.filter(
      (pos) => prGame[pos.key] !== null && prGame[pos.key] !== undefined,
    ).length;
  };

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

  return {
    game,
    prGame,
    users,
    teamId,
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

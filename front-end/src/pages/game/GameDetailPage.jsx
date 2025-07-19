import { useState } from 'react';
import GameInfo from '../../components/game/GameInfo';
import GameUpdate from '../../components/game/GameUpdate';
import PopUp from '../../components/game/PopUp';
import useGameData from '../../hooks/useGameData';
import { useParams } from 'react-router-dom';

const GameDetailPage = () => {
  const { gameId } = useParams();
  const [update, setUpdate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPositionKey, setSelectedPositionKey] = useState(null);
  const {
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
  } = useGameData({ gameId });

  const togglePopup = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (!next) setSelectedPositionKey(null);
      return next;
    });
  };

  if (loading) return <div style={{ paddingTop: '10vh' }}>로딩 중...</div>;

  return (
    <>
      {update ? (
        <GameUpdate
          setUpdate={setUpdate}
          setSelectedPositionKey={setSelectedPositionKey}
          setIsOpen={setIsOpen}
          game={game}
          setGame={setGame}
          positionList={positionList}
          getCount={getCount}
          users={users}
          setUsers={setUsers}
          currentQuarter={currentQuarter}
          setCurrentQuarter={setCurrentQuarter}
          quarters={quarters}
          selectedQuarter={selectedQuarter}
          setSelectedQuarter={setSelectedQuarter}
          currentQuarterIndex={currentQuarterIndex}
        />
      ) : (
        <GameInfo
          setUpdate={setUpdate}
          game={game}
          setGame={setGame}
          users={users}
          setUsers={setUsers}
          positionList={positionList}
          quarters={quarters}
          setQuarters={setQuarters}
          selectedQuarter={selectedQuarter}
          setSelectedQuarter={setSelectedQuarter}
          currentQuarter={currentQuarter}
          setCurrentQuarter={setCurrentQuarter}
          currentQuarterIndex={currentQuarterIndex}
          getCount={getCount}
        />
      )}
      <PopUp
        isOpen={isOpen}
        selectedPositionKey={selectedPositionKey}
        setSelectedPositionKey={setSelectedPositionKey}
        users={users}
        game={game}
        setGame={setGame}
        setIsOpen={setIsOpen}
        togglePopup={togglePopup}
        setUsers={setUsers}
        quarters={quarters}
        setQuarters={setQuarters}
        selectedQuarter={selectedQuarter}
        setSelectedQuarter={setSelectedQuarter}
        currentQuarter={currentQuarter}
        setCurrentQuarter={setCurrentQuarter}
        currentQuarterIndex={currentQuarterIndex}
        team={team}
      />
    </>
  );
};

export default GameDetailPage;

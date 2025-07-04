import { useState } from 'react';
import GameInfo from '../../components/game/GameInfo';
import GameUpdate from '../../components/game/GameUpdate';
import PopUp from '../../components/game/PopUp';
import useGameData from '../../hooks/useGameData';

const GameDetailPage = () => {
  const [update, setUpdate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPositionKey, setSelectedPositionKey] = useState(null);
  const { game, users, loading, setGame, setUsers } = useGameData();

  const togglePopup = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (!next) setSelectedPositionKey(null);
      return next;
    });
  };
  
  if (loading) return <div>로딩 중...</div>;

  return (
    <>
      {update ? (
        <GameUpdate setUpdate={setUpdate} setSelectedPositionKey={setSelectedPositionKey} setUsers={setUsers} setIsOpen={setIsOpen} game={game} setGame={setGame} />
      ) : (
        <GameInfo setUpdate={setUpdate} />
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
      />
    </>
  );
};

export default GameDetailPage;

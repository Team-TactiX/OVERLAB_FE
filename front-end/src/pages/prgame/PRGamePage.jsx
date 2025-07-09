import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PRGame from '../../components/prgame/PRGame';
import PRGameUpdate from '../../components/prgame/PRGameUpdate';
import PRGamePopUp from '../../components/prgame/PRGamePopUp';
import usePRGameData from '../../hooks/usePRGameData';

const PRGamePage = () => {
  const { prGameId } = useParams();
  const [update, setUpdate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPositionKey, setSelectedPositionKey] = useState(null);
  const { game, prGame, users, loading, setGame, setPRGame, setUsers, getCount, getPRCount, positionList } = usePRGameData();

  const togglePopup = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (!next) setSelectedPositionKey(null);
      return next;
    });
  };
  
  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      {update ? (
        <PRGameUpdate
          prGameId={prGameId}
          setUpdate={setUpdate} 
          setSelectedPositionKey={setSelectedPositionKey} 
          setUsers={setUsers}
          setIsOpen={setIsOpen}
          prGame={prGame}
          setPRGame={setPRGame} 
          game={game}
          setGame={setGame}
          getCount={getCount}
          users={users}
          getPRCount={getPRCount}
          positionList={positionList}
        />
      ) : (
        <PRGame prGameId={prGameId} users={users} setUpdate={setUpdate} getCount={getCount} getPRCount={getPRCount} positionList={positionList} />
      )}
      <PRGamePopUp
        isOpen={isOpen}
        selectedPositionKey={selectedPositionKey}
        setSelectedPositionKey={setSelectedPositionKey}
        users={users}
        prGame={prGame}
        setPRGame={setPRGame}
        setIsOpen={setIsOpen}
        togglePopup={togglePopup}
        setUsers={setUsers}
        prGameId={prGameId}
        game={game}
        setGame={setGame}
      />
    </div>
  );
};

export default PRGamePage;

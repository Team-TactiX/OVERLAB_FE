import { useState } from 'react';
import PopUp from '../../components/game/PopUp';
import PRGameCreate from '../../components/prgame/PRGameCreate';
import useData from '../../hooks/useData';
import { useParams } from 'react-router-dom';

const PRGameCreatePage = () => {
  const { quarterId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPositionKey, setSelectedPositionKey] = useState(null);
  const {
    game,
    users,
    setGame,
    setUsers,
    positionList,
    getCount,
    currentQuarter,
    setCurrentQuarter,
    team,
  } = useData({
    quarterId,
  });

  const togglePopup = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (!next) setSelectedPositionKey(null);
      return next;
    });
  };

  return (
    // PRGameCreatePageContainer 스타일 적용
    <div className="flex items-center flex-col justify-center pt-[8vh]">
      <PRGameCreate
        game={game}
        setGame={setGame}
        users={users}
        setUsers={setUsers}
        setIsOpen={setIsOpen}
        setSelectedPositionKey={setSelectedPositionKey}
        positionList={positionList}
        getCount={getCount}
        currentQuarter={currentQuarter}
        setCurrentQuarter={setCurrentQuarter}
        team={team}
      />
      <PopUp
        isOpen={isOpen}
        selectedPositionKey={selectedPositionKey}
        setSelectedPositionKey={setSelectedPositionKey}
        users={users}
        game={game}
        setGame={setGame}
        setIsOpen={setIsOpen}
        togglePopup={togglePopup}
        currentQuarter={currentQuarter}
        setCurrentQuarter={setCurrentQuarter}
        team={team}
      />
    </div>
  );
};

export default PRGameCreatePage;

import styled from 'styled-components';
import { useState } from 'react';
import PopUp from '../../components/game/PopUp';
import PRGameCreate from '../../components/prgame/PRGameCreate';
import useGameData from '../../hooks/useGameData';
import { useParams } from 'react-router-dom';
import useData from '../../hooks/useData';

const PRGameCreatePageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding-top: 8vh;
`;

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
    <PRGameCreatePageContainer>
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
    </PRGameCreatePageContainer>
  );
};

export default PRGameCreatePage;

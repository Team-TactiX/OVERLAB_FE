import styled from 'styled-components';
import { useState } from 'react';
import PopUp from '../../components/game/PopUp';
import PRGameCreate from '../../components/prgame/PRGameCreate';
import useGameData from '../../hooks/useGameData';

const PRGameCreatePageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding-top: 8vh;
`;

const PRGameCreatePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPositionKey, setSelectedPositionKey] = useState(null);
  const { game, users, setGame, setUsers, positionList, getCount } = useGameData();

  const togglePopup = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (!next) setSelectedPositionKey(null);
      return next;
    });
  };

  return (
    <PRGameCreatePageContainer>
      <PRGameCreate game={game} setGame={setGame} users={users} setUsers={setUsers} setIsOpen={setIsOpen} setSelectedPositionKey={setSelectedPositionKey} positionList={positionList} getCount={getCount} />
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

    </PRGameCreatePageContainer>
  );
};

export default PRGameCreatePage;

import styled from 'styled-components';
import { useState } from 'react';
import PopUp from '../../components/game/PopUp';
import PRGameCreate from '../../components/prgame/PRGameCreate';

const PRGameCreatePageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-top: 8vh;
`;

const PRGameCreatePage = () => {
  const [game, setGame] = useState(null);
  const [users, setUsers] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPositionKey, setSelectedPositionKey] = useState(null);

  const togglePopup = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (!next) setSelectedPositionKey(null);
      return next;
    });
  };

  return (
    <PRGameCreatePageContainer>
      <PRGameCreate setUsers={setUsers} setIsOpen={setIsOpen} setSelectedPositionKey={setSelectedPositionKey} />
      <PopUp
        isOpen={isOpen}
        selectedPositionKey={selectedPositionKey}
        setSelectedPositionKey={setSelectedPositionKey}
        users={users}
        game={game}
        setGame={setGame}
        setIsOpen={setIsOpen}
        togglePopup={togglePopup}
      />

    </PRGameCreatePageContainer>
  );
};

export default PRGameCreatePage;

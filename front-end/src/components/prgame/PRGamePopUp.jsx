import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';

const ChangeButton = styled.button`
  background-color: black;
  color: white;
  width: 40vh;
  height: 6vh;
  font-size: 2vh;
  border-radius: 0.7vh;
  margin-bottom: 2vh;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

const PopupBox = styled.div`
  position: fixed;
  width: 100%;
  height: 50vh;
  background: white;
  transition: bottom 0.3s ease-in-out;
  bottom: ${({ $open }) => ($open ? '0vh' : '-30vh')};
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 2vh;
  max-width: 400px;
  z-index: 1000;
  margin-bottom: 56px;
  overflow-y: auto;
`;

const PopupButton = styled.button`
  margin-top: 1vh;
  width: 100%;
  margin-bottom: 2vh;
  background-color: white;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const PopupTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 2vh;
`;

const UsersBox = styled.div`
  display: flex;
  flex-wrap: wrap; /* 줄바꿈 허용 */
  gap: 1.5vh; /* 아이템 간 간격 */
  justify-content: flex-start;
`;

const UserBox = styled.div`
  width: calc(33.333% - 1vh); /* 3개씩 한 줄에 정렬 */
  background-color: rgba(240, 228, 57);
  border-radius: 6px;
  border: 2px solid black;
  box-sizing: border-box;
  padding: 1vh;
  text-align: center;
`;

const UserPositionBox = styled.div`
  font-size: 1.5vh;
`;

const UserNameBox = styled.div`
  font-size: 2.3vh;
`;

const PRGamePopUp = ({ isOpen, selectedPositionKey, setSelectedPositionKey, users, prGame, setPRGame, setIsOpen, togglePopup, setUsers, prGameId, game, setGame }) => {
  const gameId = sessionStorage.getItem('gameId');

  const positionKeyToRole = useMemo(
    () => ({
      stId: 'ST',
      lsId: 'LS',
      rsId: 'RS',
      lwId: 'LW',
      rwId: 'RW',
      cfId: 'CF',
      camId: 'CAM',
      lamId: 'LAM',
      ramId: 'RAM',
      cmId: 'CM',
      lcmId: 'LCM',
      rcmId: 'RCM',
      lmId: 'LM',
      rmId: 'RM',
      cdmId: 'CDM',
      ldmId: 'LDM',
      rdmId: 'RDM',
      lwbId: 'LWB',
      rwbId: 'RWB',
      lbId: 'LB',
      rbId: 'RB',
      lcbId: 'LCB',
      rcbId: 'RCB',
      swId: 'SW',
      gkId: 'GK',
    }),
    [],
  );

  useEffect(() => {
    const fetchGame = async () => {
      const res = await fetch(`/api/pr-games/findByPRGameId/${prGameId}`);
      const prData = await res.json();
      setPRGame(prData);

      const response = await fetch(`/api/games/saved-formation/${gameId}`);
      const gameData = await response.json();

      const positionKeys = Object.keys(positionKeyToRole);
      positionKeys.forEach((key) => {
        if (prData[key]) {
          gameData[key] = prData[key];
        }
      });

      setUsers(gameData.playersMail);
    };

    fetchGame();
  }, [prGameId, gameId, positionKeyToRole]);

  const positionKeys = Object.keys(positionKeyToRole);

  const assignedUserMails = new Set(
    prGame
      ? positionKeys.map((key) => prGame[key]?.userMail).filter(Boolean)
      : [],
  );

  const handleUserSelect = (user) => {
    if (!selectedPositionKey) {
      return;
    }

    setGame((prevGame) => ({
      ...prevGame,
      [selectedPositionKey]: user,
    }));

    setPRGame((prevGame) => ({
      ...prevGame,
      [selectedPositionKey]: user,
    }));

    setSelectedPositionKey(null);
    setIsOpen(false);
  };

  const preferredUsers =
    users && selectedPositionKey
      ? users.filter(
          (user) =>
            !assignedUserMails.has(user.userMail) &&
            [
              user.firstPosition,
              user.secondPosition,
              user.thirdPosition,
            ].includes(positionKeyToRole[selectedPositionKey]),
        )
      : [];

  const otherUsers = users
    ? users.filter((user) =>
        selectedPositionKey
          ? !assignedUserMails.has(user.userMail) && !preferredUsers.includes(user)
          : !assignedUserMails.has(user.userMail),
      )
    : [];

  const handleRemovePlayer = () => {
    if (!selectedPositionKey) return;
    setGame((prevGame) => ({
      ...prevGame,
      [selectedPositionKey]: null,
    }));
    setPRGame((prevGame) => ({
      ...prevGame,
      [selectedPositionKey]: null,
    }));
    setSelectedPositionKey(null);
    setIsOpen(false);
  };

  if (!game) return <div>로딩 중...</div>;

  return (
      <PopupBox $open={isOpen}>
        <PopupButton onClick={togglePopup}>{isOpen ? '▼' : '▲'}</PopupButton>

        {selectedPositionKey && (
          <>
            <PopupTitle>추천 선수</PopupTitle>
            {preferredUsers.length > 0 ? (
              <UsersBox>
                {preferredUsers.map((user) => (
                  <UserBox
                    key={user.userMail}
                    onClick={() => handleUserSelect(user)}
                  >
                    <UserPositionBox>
                      {user.firstPosition}, {user.secondPosition},{' '}
                      {user.thirdPosition}
                    </UserPositionBox>
                    <UserNameBox>{user.userName}</UserNameBox>
                  </UserBox>
                ))}
              </UsersBox>
            ) : (
              <p style={{ textAlign: 'center', marginBottom: '2vh' }}>
                추천 선수가 없습니다
              </p>
            )}
          </>
        )}

        <PopupTitle>참가자 명단</PopupTitle>
        {otherUsers.length > 0 ? (
          <UsersBox>
            {otherUsers.map((user) => (
              <UserBox
                key={user.userMail}
                onClick={() => handleUserSelect(user)}
              >
                <UserPositionBox>
                  {user.firstPosition}, {user.secondPosition},{' '}
                  {user.thirdPosition}
                </UserPositionBox>
                <UserNameBox>{user.userName}</UserNameBox>
              </UserBox>
            ))}
          </UsersBox>
        ) : (
          <p style={{ textAlign: 'center', marginBottom: '2vh' }}>
            참가자가 없습니다
          </p>
        )}
        {selectedPositionKey && (
          <ChangeButton
            onClick={handleRemovePlayer}
            style={{
              marginTop: '2vh',
              width: '100%',
              backgroundColor: '#c0392b',
            }}
          >
            선수 제거
          </ChangeButton>
        )}
      </PopupBox>
  );
};

export default PRGamePopUp;

import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';

const PopupBox = styled.div`
  position: fixed;
  width: 100%;
  min-height: 7vh;
  height: ${({ $open }) => ($open ? '50vh' : '7vh')};
  background: white;
  transition: height 0.3s ease-in-out;
  bottom: 56px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 12px;
  border-top-right-radius: 20px;
  padding: 1vh 2vh;
  max-width: 460px;
  z-index: 500;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

const PopupButton = styled.button`
  width: 100%;
  background-color: white;
  border: none;
  font-size: 2.3vh;
  cursor: pointer;
  padding: 1vh 0;
  font-weight: bold;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5vh;
  &:hover {
    color: #00b894;
  }
  &:active {
    transform: scale(0.95);
  }
`;

const PopupTitle = styled.h4`
  margin-top: 2vh;
  margin-bottom: 1vh;
  font-weight: bold;
  padding-left: 1vh;
`;

const UsersBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
`;

const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.2vh 1.5vh;
  border-radius: 1vh;
  background-color: #f9f9f9;
  border-left: 5px solid #dcdde1;
  transition: all 0.2s ease;
  &:hover {
    background-color: #ecf0f1;
  }
`;

const Badge = styled.span`
  display: inline-block;
  background-color: ${({ role }) => {
    if (["ST", "CF", "LS", "RS", "LW", "RW"].includes(role)) return "#ff7675";
    if (["CAM", "CM", "CDM", "LAM", "RAM", "LCM", "RCM", "LDM", "RDM", "LM", "RM"].includes(role)) return "#55efc4";
    if (["LB", "RB", "LCB", "RCB", "SW", "LWB", "RWB"].includes(role)) return "#74b9ff";
    if (["GK"].includes(role)) return "#fdcb6e";
    return "#b2bec3";
  }};
  color: white;
  border-radius: 1vh;
  padding: 0.3vh 0.7vh;
  font-size: 1.2vh;
  margin-right: 0.4vh;
`;

const UserNameBox = styled.div`
  font-size: 1.9vh;
  font-weight: bold;
  color: #2d3436;
  margin-bottom: 0.5vh;
  display: flex;
  align-items: center;
  gap: 0.6vh;
`;

const UserPositionBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5vh;
`;

const ChangeButton = styled.button`
  background-color: white;
  color: #c0392b;
  border: 2px solid #c0392b;
  width: 100%;
  height: 5vh;
  font-size: 1.8vh;
  border-radius: 3vh;
  margin-top: 2vh;
  box-sizing: border-box;
  transition: all 0.2s;
  &:hover {
    background-color: #c0392b;
    color: white;
    transform: scale(0.97);
  }
  &:active {
    transform: scale(0.93);
  }
`;

const PRGamePopUp = ({
  isOpen,
  selectedPositionKey,
  setSelectedPositionKey,
  users,
  prGame,
  setPRGame,
  setIsOpen,
  togglePopup,
  setUsers,
  prGameId,
  game,
  setGame,
}) => {
  const gameId = sessionStorage.getItem('gameId');

  const positionKeyToRole = useMemo(() => ({
    stId: 'ST', lsId: 'LS', rsId: 'RS', lwId: 'LW', rwId: 'RW', cfId: 'CF',
    camId: 'CAM', lamId: 'LAM', ramId: 'RAM', cmId: 'CM', lcmId: 'LCM', rcmId: 'RCM',
    lmId: 'LM', rmId: 'RM', cdmId: 'CDM', ldmId: 'LDM', rdmId: 'RDM',
    lwbId: 'LWB', rwbId: 'RWB', lbId: 'LB', rbId: 'RB', lcbId: 'LCB', rcbId: 'RCB',
    swId: 'SW', gkId: 'GK',
  }), []);

  useEffect(() => {
    const fetchGame = async () => {
      const res = await fetch(`http://52.78.12.127:8080/api/pr-games/findByPRGameId/${prGameId}`);
      const prData = await res.json();
      setPRGame(prData);

      const response = await fetch(`http://52.78.12.127:8080/api/games/saved-formation/${gameId}`);
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

  const assignedUserMails = new Set(
    Object.values(prGame || {}).map((user) => user?.userMail).filter(Boolean)
  );

  const handleUserSelect = (user) => {
    if (!selectedPositionKey) return;

    setGame((prev) => ({ ...prev, [selectedPositionKey]: user }));
    setPRGame((prev) => ({ ...prev, [selectedPositionKey]: user }));

    setSelectedPositionKey(null);
    setIsOpen(false);
  };

  const handleRemovePlayer = () => {
    if (!selectedPositionKey) return;
    setGame((prev) => ({ ...prev, [selectedPositionKey]: null }));
    setPRGame((prev) => ({ ...prev, [selectedPositionKey]: null }));
    setSelectedPositionKey(null);
    setIsOpen(false);
  };

  const preferredUsers = users?.filter(
    (user) =>
      !assignedUserMails.has(user.userMail) &&
      [user.firstPosition, user.secondPosition, user.thirdPosition].includes(
        positionKeyToRole[selectedPositionKey]
      )
  ) || [];

  const otherUsers = users?.filter(
    (user) =>
      !assignedUserMails.has(user.userMail) &&
      !preferredUsers.includes(user)
  ) || [];

  const renderUserCard = (user) => (
    <UserCard key={user.userMail} onClick={() => handleUserSelect(user)}>
      <UserNameBox>
        <span role="img" aria-label="user">👤</span> {user.userName}
      </UserNameBox>
      <UserPositionBox>
        {[user.firstPosition, user.secondPosition, user.thirdPosition]
          .filter(Boolean)
          .map((pos, i) => (
            <Badge key={i} role={pos}>{pos}</Badge>
          ))}
      </UserPositionBox>
    </UserCard>
  );

  return (
    <PopupBox $open={isOpen}>
      <PopupButton onClick={togglePopup}>
        {isOpen ? '▼ 닫기' : '▲ 참가자 명단'}
      </PopupButton>

      {isOpen && (
        <>
          {selectedPositionKey && (
            <>
              <PopupTitle>추천 선수</PopupTitle>
              {preferredUsers.length > 0 ? (
                <UsersBox>
                  {preferredUsers.map(renderUserCard)}
                </UsersBox>
              ) : (
                <p style={{ textAlign: 'center', marginBottom: '6vh' }}>
                  추천 선수가 없습니다
                </p>
              )}
            </>
          )}

          {selectedPositionKey && (
            <ChangeButton onClick={handleRemovePlayer}>선수 제거</ChangeButton>
          )}

          <PopupTitle>참가자 명단</PopupTitle>
          {otherUsers.length > 0 ? (
            <UsersBox>
              {otherUsers.map(renderUserCard)}
            </UsersBox>
          ) : (
            <p style={{ textAlign: 'center', marginBottom: '2vh' }}>
              참가자가 없습니다
            </p>
          )}
        </>
      )}
    </PopupBox>
  );
};

export default PRGamePopUp;

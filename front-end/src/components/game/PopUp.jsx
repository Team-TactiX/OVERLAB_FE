const getBadgeColor = (role) => {
  if (['ST', 'CF', 'LS', 'RS', 'LW', 'RW'].includes(role))
    return 'bg-[#ff7675]';
  if (
    [
      'CAM',
      'CM',
      'CDM',
      'LAM',
      'RAM',
      'LCM',
      'RCM',
      'LDM',
      'RDM',
      'LM',
      'RM',
    ].includes(role)
  )
    return 'bg-[#55efc4]';
  if (['LB', 'RB', 'LCB', 'RCB', 'SW', 'LWB', 'RWB'].includes(role))
    return 'bg-[#74b9ff]';
  if (['GK'].includes(role)) return 'bg-[#fdcb6e]';
  return 'bg-[#b2bec3]';
};

const PopUp = ({
  isOpen,
  selectedPositionKey,
  setSelectedPositionKey,
  users = [],
  game,
  setGame,
  setIsOpen,
  togglePopup,
  currentQuarter,
  setCurrentQuarter,
  team,
}) => {
  const positionKeyToRole = {
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
  };

  const handleUserSelect = (user) => {
    let targetPositionKey = selectedPositionKey;
    if (!targetPositionKey) {
      const emptyPosition = Object.entries(game || {}).find(
        ([, value]) => !value,
      );
      if (!emptyPosition) {
        alert('모든 포지션이 이미 배정되었습니다.');
        return;
      }
      targetPositionKey = emptyPosition[0];
    }
    setCurrentQuarter((prevCurrentQuarter) => ({
      ...prevCurrentQuarter,
      [targetPositionKey]: user,
    }));
    setSelectedPositionKey(null);
    setIsOpen(false);
  };

  const assignedUserMails = new Set(
    currentQuarter
      ? Object.values(currentQuarter)
          .map((user) => user?.userMail)
          .filter(Boolean)
      : [],
  );

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
          ? !assignedUserMails.has(user.userMail) &&
            !preferredUsers.includes(user)
          : !assignedUserMails.has(user.userMail),
      )
    : [];

  const handleRemovePlayer = () => {
    if (!selectedPositionKey) return;
    setCurrentQuarter((prevCurrentQuarter) => ({
      ...prevCurrentQuarter,
      [selectedPositionKey]: null,
    }));
    setSelectedPositionKey(null);
    setIsOpen(false);
  };

  const renderUserCard = (user) => {
    const isGuest = !team?.users?.some(
      (teamUser) => teamUser.userMail === user.userMail,
    );

    return (
      <div
        key={user.userMail}
        onClick={() => handleUserSelect(user)}
        className="flex flex-col px-[1.5vh] py-[1.2vh] rounded-[1vh] bg-[#f9f9f9] border-l-[5px] border-l-[#dcdde1] transition-all duration-200 ease-in-out hover:bg-[#ecf0f1]"
      >
        <div className="text-[1.9vh] font-bold text-[#2d3436] mb-[0.5vh] flex items-center gap-[0.6vh]">
          <span role="img" aria-label="user">
            👤
          </span>
          {user.userName}
          {isGuest && (
            <span className="text-[1.2vh] text-[#e17055] ml-[0.6vh] bg-[#ffeaa7] px-[0.5vh] py-[0.2vh] rounded-[0.5vh]">
              용병
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-[0.5vh]">
          {[user.firstPosition, user.secondPosition, user.thirdPosition]
            .filter(Boolean)
            .map((pos, i) => (
              <span
                key={i}
                className={`inline-block text-white rounded-[1vh] px-[0.7vh] py-[0.3vh] text-[1.2vh] mr-[0.4vh] ${getBadgeColor(
                  pos,
                )}`}
              >
                {pos}
              </span>
            ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`fixed bottom-16 w-full max-w-md min-h-20 bg-white transition-[height] duration-300 ease-in-out shadow-[0_-2px_8px_rgba(0,0,0,0.1)] rounded-tl-[12px] rounded-tr-[20px] px-[2vh] pt-1 pb-8 z-[500] overflow-y-scroll scrollbar-hide ${
        isOpen ? 'h-50' : 'h-20'
      }`}
    >
      <button
        onClick={togglePopup}
        className="w-full bg-white border-none text-[2.3vh] cursor-pointer py-[1vh] font-bold text-[#2c3e50] flex justify-center items-center gap-[0.5vh] hover:text-[#00b894] active:scale-95 transition-transform"
      >
        {isOpen ? '▼ 닫기' : '▲ 참가자 명단'}
      </button>

      {isOpen && (
        <>
          {selectedPositionKey && (
            <>
              <h4 className="mt-[2vh] mb-[1vh] font-bold pl-[1vh]">
                추천 선수
              </h4>
              {preferredUsers.length > 0 ? (
                <div className="flex flex-col gap-[1vh]">
                  {preferredUsers.map((user) => renderUserCard(user))}
                </div>
              ) : (
                <p className="text-center mb-[6vh]">추천 선수가 없습니다</p>
              )}
            </>
          )}

          {selectedPositionKey && (
            <button
              onClick={handleRemovePlayer}
              className="bg-white text-[#c0392b] border-2 border-[#c0392b] w-full h-[5vh] text-[1.8vh] rounded-[3vh] mt-[2vh] transition-all duration-200 hover:bg-[#c0392b] hover:text-white hover:scale-97 active:scale-93"
            >
              선수 제거
            </button>
          )}

          <h4 className="mt-[2vh] mb-[1vh] font-bold pl-[1vh]">참가자 명단</h4>
          {otherUsers.length > 0 ? (
            <div className="flex flex-col gap-[1vh]">
              {otherUsers.map((user) => renderUserCard(user))}
            </div>
          ) : (
            <p className="text-center mb-[2vh]">참가자가 없습니다</p>
          )}
        </>
      )}
    </div>
  );
};

export default PopUp;

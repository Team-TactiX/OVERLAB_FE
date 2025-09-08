import { useEffect, useMemo, useState } from 'react';

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
  quarterId,
}) => {
  const gameId = sessionStorage.getItem('gameId');
  const [team, setTeam] = useState();

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
    if (!quarterId) return;

    const fetchGame = async () => {
      const res = await fetch(
        `http://52.78.12.127:8080/api/pr-games/findByPRGameId/${prGameId}`,
      );
      const prData = await res.json();
      setPRGame(prData);

      const response = await fetch(
        `http://52.78.12.127:8080/api/quarters/saved-formation/${quarterId}`,
      );
      const quarterData = await response.json();

      const positionKeys = Object.keys(positionKeyToRole);
      positionKeys.forEach((key) => {
        if (prData[key]) {
          quarterData[key] = prData[key];
        }
      });

      const gameRes = await fetch(
        `http://52.78.12.127:8080/api/games/game/${quarterData.gameId}`,
      );
      const gameData = await gameRes.json();

      const teamRes = await fetch(
        `http://52.78.12.127:8080/api/teams/${gameData.teamId}`,
      );
      const teamData = await teamRes.json();
      setTeam(teamData);
      setUsers(quarterData.playersMail);
    };

    fetchGame();
  }, [prGameId, quarterId, gameId, positionKeyToRole]);

  const assignedUserMails = new Set(
    Object.values(prGame || {})
      .map((user) => user?.userMail)
      .filter(Boolean),
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

  const preferredUsers =
    users?.filter(
      (user) =>
        !assignedUserMails.has(user.userMail) &&
        [user.firstPosition, user.secondPosition, user.thirdPosition].includes(
          positionKeyToRole[selectedPositionKey],
        ),
    ) || [];

  const otherUsers =
    users?.filter(
      (user) =>
        !assignedUserMails.has(user.userMail) && !preferredUsers.includes(user),
    ) || [];

  const getBadgeColor = (role) => {
    if (['ST', 'CF', 'LS', 'RS', 'LW', 'RW'].includes(role))
      return 'bg-red-400';
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
      return 'bg-teal-400';
    if (['LB', 'RB', 'LCB', 'RCB', 'SW', 'LWB', 'RWB'].includes(role))
      return 'bg-blue-400';
    if (['GK'].includes(role)) return 'bg-yellow-400';
    return 'bg-gray-400';
  };

  const renderUserCard = (user) => {
    const isGuest = !team?.users?.some(
      (teamUser) => teamUser.userMail === user.userMail,
    );

    return (
      <div
        key={user.userMail}
        onClick={() => handleUserSelect(user)}
        className="flex flex-col p-[1.2vh] rounded-[1vh] bg-gray-50 border-l-[5px] border-l-gray-300 transition-colors hover:bg-gray-200 cursor-pointer"
      >
        <div className="flex items-center gap-[0.6vh] font-bold text-[1.9vh] text-gray-800 mb-[0.5vh]">
          <span role="img" aria-label="user">
            👤
          </span>{' '}
          {user.userName}
          {isGuest && (
            <span className="ml-[0.6vh] text-[1.2vh] text-orange-600 bg-orange-100 py-[0.2vh] px-[0.5vh] rounded-[0.5vh]">
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
                className={`${getBadgeColor(
                  pos,
                )} text-white rounded-[1vh] px-[0.7vh] py-[0.3vh] text-[1.2vh]`}
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
      className={`
        fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-md
        bg-white transition-all duration-300 ease-in-out
        shadow-[0_-2px_8px_rgba(0,0,0,0.1)]
        border-t-2 border-l-2 border-r-2 border-solid border-white
        rounded-t-3xl p-[1vh]
        z-50 box-border
        overflow-y-scroll scrollbar-hide
        ${isOpen ? 'h-96' : 'h-20'}
      `}
    >
      <button
        onClick={togglePopup}
        className="w-full bg-white border-none text-[2.3vh] font-bold text-[#2c3e50] cursor-pointer py-[1vh] flex justify-center items-center gap-[0.5vh] hover:text-green-500 active:scale-95 mt-4"
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
                  {preferredUsers.map(renderUserCard)}
                </div>
              ) : (
                <p className="text-center mb-[6vh]">추천 선수가 없습니다</p>
              )}
            </>
          )}

          {selectedPositionKey && (
            <button
              onClick={handleRemovePlayer}
              className="bg-white text-red-600 border-2 border-red-600 w-full h-[5vh] text-[1.8vh] rounded-[3vh] mt-[2vh] box-border transition-all duration-200 hover:bg-red-600 hover:text-white hover:scale-97 active:scale-93"
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

export default PRGamePopUp;

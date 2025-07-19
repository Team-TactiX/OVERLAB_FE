import field from '../../img/field.png';
import playerIcon from '../../img/player.png';
import uniformIcon from '../../img/uniform.png';
import grayUniformIcon from '../../img/grayUniform.png';

const GameUpdateFormation = ({
  users,
  setSelectedPositionKey,
  setIsOpen,
  getCount,
  positionList,
  game,
  quarters,
  selectedQuarter,
  setSelectedQuarter,
  currentQuarter,
  setCurrentQuarter,
  team,
}) => {
  const count = getCount();

  const handlePositionClick = (positionKey) => {
    setSelectedPositionKey(positionKey);
    setIsOpen(true);
  };

  if (!quarters) return;

  return (
    <>
      <div className="flex justify-around mb-[2vh] border-b border-gray-300">
        {quarters.map((quarter) => (
          <div
            key={quarter.quarterId}
            className={`text-[2vh] p-[1vh_2vh] cursor-pointer ${
              selectedQuarter === quarter.quarter
                ? 'font-bold border-b-[3px] border-black'
                : 'font-normal'
            }`}
            onClick={() => {
              setSelectedQuarter(quarter.quarter);
              setCurrentQuarter(quarter);
            }}
          >
            {quarter.quarter}
          </div>
        ))}
      </div>

      {/* 라인업 통계 */}
      <div className="flex gap-[1.2vh] items-center text-[1.6vh] font-medium mb-[1.8vh]">
        <span className="text-gray-500">Starting: {users.length}</span>
        <span className="text-green-500">Lineup: {count}</span>
      </div>

      {/* 필드 이미지 및 포지션 */}
      <div
        className="relative w-[49vh] h-[42vh] mb-[2vh]"
        style={{
          backgroundImage: `url(${field})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute w-full h-full">
          {positionList.map(({ key, label, top, left }) => (
            <button key={key} onClick={() => handlePositionClick(key)}>
              <div
                className="absolute flex flex-col items-center"
                style={{
                  top,
                  left,
                  transform: 'translate(-0%, -0%)',
                }}
              >
                <img
                  src={
                    currentQuarter[key]
                      ? !team.users?.some(
                          (user) =>
                            user.userMail === currentQuarter[key].userMail,
                        )
                        ? grayUniformIcon
                        : uniformIcon
                      : playerIcon
                  }
                  alt="player"
                  className="w-[4.5vh] h-[4.5vh] object-contain"
                />
                <span className="text-white font-bold text-[1.8vh] whitespace-nowrap drop-shadow-[0_0_0.6vh_black] mt-[-2vh]">
                  {currentQuarter[key] ? currentQuarter[key].userName : label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default GameUpdateFormation;

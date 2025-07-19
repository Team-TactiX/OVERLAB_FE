import field from '../../img/field.png';
import playerIcon from '../../img/player.png';

const GameFormation = ({
  positionList,
  selectedQuarter,
  setSelectedQuarter,
  quarters,
  currentQuarter,
  setCurrentQuarter,
  currentQuarterIndex,
  users,
  setUsers,
  getCount,
}) => {
  const count = getCount();

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

      {/* 인원 */}
      <div className="flex gap-[1.5vh] items-center text-[1.6vh] font-semibold mb-[2vh]">
        <span className="text-gray-500">Starting: {users.length}</span>
        <span className="text-green-500">Lineup: {count}</span>
      </div>

      <div
        className="relative w-[49vh] h-[42vh] mb-[4vh]"
        style={{
          backgroundImage: `url(${field})`,
          backgroundSize: '100% 100%',
        }}
      >
        <div className="absolute w-full h-full">
          {positionList.map(({ key: positionKey, top, left }) => {
            const player = currentQuarter ? currentQuarter[positionKey] : null;

            return player ? (
              <div key={positionKey}>
                <div
                  className="absolute flex items-center justify-center"
                  style={{ top, left }}
                >
                  <img
                    src={playerIcon}
                    alt="player"
                    className="w-[4.5vh] h-[4.5vh] object-contain"
                  />
                </div>
                <span
                  className="absolute text-white font-bold text-[1.8vh] whitespace-nowrap drop-shadow-[0_0_0.6vh_black]"
                  style={{
                    top:
                      positionKey === 'gkId'
                        ? `calc(${top} + 2vh)`
                        : `calc(${top} + 2.5vh)`,
                    left,
                  }}
                >
                  {player.userName}
                </span>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </>
  );
};

export default GameFormation;

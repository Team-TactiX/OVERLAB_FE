import { Link } from 'react-router-dom';
import altImage from '../../img/alt_image.png';

const MyCalender = ({ game }) => {
  return (
    <Link to={`/game/${game.gameId}`} className="no-underline text-inherit">
      {/* Card 스타일 적용 */}
      <div className="flex justify-between items-center p-[2vh] rounded-[1.5vh] mb-[3vh] bg-white shadow-md border-[1.5px] border-transparent transition-all duration-200 ease-in-out hover:border-[#00c264]">
        {/* Team 스타일 적용 */}
        <div className="flex flex-col items-center">
          {/* Logo 스타일 적용 */}
          <img
            src={`http://52.78.12.127:8080/logos/${game.team.logo}`}
            onError={(e) => {
              e.target.src = altImage;
            }}
            alt="team logo"
            className="w-[7vh] h-[7vh] rounded-full object-cover"
          />
          {/* Name 스타일 적용 */}
          <div className="text-[1.6vh] font-bold mt-[0.5vh] text-center max-w-[12vh] whitespace-nowrap overflow-hidden text-ellipsis">
            {game.team.teamName}
          </div>
        </div>

        {/* Middle 스타일 적용 */}
        <div className="flex flex-col items-center gap-[1vh] font-bold">
          <div className="text-[3vh]">VS</div>
          <div className="text-[1.4vh] text-gray-600">
            {game.date.slice(0, 10)}
          </div>
        </div>

        {/* Team 스타일 적용 */}
        <div className="flex flex-col items-center">
          {/* Logo 스타일 적용 */}
          <img
            src={`/logos/${game.logo}`}
            onError={(e) => {
              e.target.src = altImage;
            }}
            alt="game logo"
            className="w-[7vh] h-[7vh] rounded-full object-cover"
          />
          {/* Name 스타일 적용 */}
          <div className="text-[1.6vh] font-bold mt-[0.5vh] text-center max-w-[12vh] whitespace-nowrap overflow-hidden text-ellipsis">
            {game.gameName}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MyCalender;

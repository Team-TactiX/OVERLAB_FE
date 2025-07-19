import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import altImage from '../../img/alt_image.png';
import { useEffect, useState } from 'react';

const getGameStatus = (gameDate) => {
  const now = dayjs();
  const start = dayjs(gameDate);
  const end = start.add(1, 'hour');

  if (now.isBefore(start)) return '예정';
  if (now.isAfter(end)) return '완료';
  return '진행중';
};

const getLeftBarColor = (status) => {
  switch (status) {
    case '예정':
      return 'bg-blue-500';
    case '진행중':
      return 'bg-yellow-400';
    case '완료':
      return 'bg-gray-400';
    default:
      return 'bg-gray-200';
  }
};

const GameStatusBadge = ({ status }) => {
  const statusStyle = {
    예정: 'bg-blue-100 text-blue-700',
    진행중: 'bg-yellow-100 text-yellow-700',
    완료: 'bg-gray-200 text-gray-700',
  };

  return (
    <span
      className={`text-[1.4vh] px-[1.2vh] py-[0.4vh] rounded-full font-semibold ${statusStyle[status]}`}
    >
      {status}
    </span>
  );
};

const MySchedule = ({ game }) => {
  const [team, setTeam] = useState('');
  const status = getGameStatus(game.date);

  const dayName = ['일', '월', '화', '수', '목', '금', '토'][
    dayjs(game.date).day()
  ];
  const barColor = getLeftBarColor(status);

  useEffect(() => {
    const fetchData = async () => {
      const teamResponse = await fetch(
        `http://52.78.12.127:8080/api/teams/${game.teamId}`,
      );

      if (!teamResponse.ok) return;
      const teamData = await teamResponse.json();
      setTeam(teamData);
    };

    fetchData();
  }, [game]);

  return (
    <Link to={`/game/${game.gameId}`} className="no-underline text-inherit">
      <div className="flex items-center border border-gray-300 rounded-[1.2vh] shadow-sm mb-[2vh] hover:shadow-md transition">
        {/* 좌측 컬러 바 */}
        <div
          className={`${barColor} w-[0.8vh] h-full rounded-tl-[1.2vh] rounded-bl-[1.2vh]`}
        ></div>

        {/* 본문 */}
        <div className="flex-1 p-[1vh] flex flex-col gap-[1vh]">
          {/* 상단 (날짜 + 상태) */}
          <div className="flex justify-between items-center">
            <div className="text-[1.6vh] text-gray-600">
              {dayjs(game.date).format('YYYY-MM-DD')} ({dayName}){' '}
              {dayjs(game.date).format('HH:mm')}
            </div>
            <GameStatusBadge status={status} />
          </div>

          {/* 경기 정보 */}
          <div className="flex justify-between items-center">
            {/* 내 팀 */}
            <div className="flex flex-col items-center w-[30%]">
              <img
                src={`http://52.78.12.127:8080/logos/${team.logo}`}
                onError={(e) => (e.target.src = altImage)}
                className="w-[7vh] h-[7vh] rounded-full object-cover mb-[0.3vh] border-2 border-white shadow-sm"
              />
              <div className="text-[1.6vh] font-bold max-w-[8vh] truncate text-center">
                {team.teamName}
              </div>
            </div>

            {/* VS */}
            <div className="flex flex-col items-center w-[30%]">
              <div className="text-[3.4vh] font-extrabold text-gray-800">
                VS
              </div>
            </div>

            {/* 상대 팀 */}
            <div className="flex flex-col items-center w-[30%]">
              <img
                src={`http://52.78.12.127:8080/logos/${game.oppoLogo}`}
                onError={(e) => (e.target.src = altImage)}
                className="w-[7vh] h-[7vh] rounded-full object-cover mb-[0.3vh] border-2 border-white shadow-sm"
              />
              <div className="text-[1.6vh] font-bold max-w-[8vh] truncate text-center">
                {game.versus}
              </div>
            </div>
          </div>

          {/* 경기명 */}
          <div className="text-[1.8vh] text-gray-700 text-center truncate">
            {game.gameName}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MySchedule;

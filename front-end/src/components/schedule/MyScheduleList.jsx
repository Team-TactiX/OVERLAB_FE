import { useEffect, useState } from 'react';
import MySchedule from './MySchedule';
import dayjs from 'dayjs';

const MyScheduleList = ({ filter }) => {
  const userMail = sessionStorage.getItem('userMail');
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      const res = await fetch(`http://52.78.12.127:8080/api/teams/mail/${userMail}`);
      if (res.ok) {
        const data = await res.json();
        setTeams(data);
      }
    };
    fetchTeams();
  }, [userMail]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(`http://52.78.12.127:8080/api/games/user/${userMail}`);
        if (res.ok) {
          const data = await res.json();
          setGames(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    if (teams.length > 0) fetchGames();
  }, [teams]);

  if (loading) return <div className="text-center text-[1.8vh]">불러오는 중...</div>;
  if (games.length === 0) return <div className="text-center text-[1.8vh]">예정된 경기가 없습니다.</div>;

  const getGameStatus = (gameDate) => {
    const now = dayjs();
    const start = dayjs(gameDate);
    const end = start.add(1, 'hour');

    if (now.isBefore(start)) return '예정';
    if (now.isAfter(end)) return '완료';
    return '진행중';
  };

  const sortedGames = [...games].sort((a, b) =>
    dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1
  );

  const filteredGames =
    filter === '전체' ? sortedGames : sortedGames.filter((g) => getGameStatus(g.date) === filter);

  return (
    <div className="flex flex-col gap-[2vh]">
      {filteredGames.length > 0 ? (
        filteredGames.map((game) => (
          <MySchedule key={game.gameId} game={game} />
        ))
      ) : (
        <div className="text-center text-[1.8vh] text-gray-500">해당 경기가 없습니다.</div>
      )}
    </div>
  );
};

export default MyScheduleList;

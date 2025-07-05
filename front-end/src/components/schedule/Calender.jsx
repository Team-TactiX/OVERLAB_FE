import dayjs from "dayjs";
import { useEffect, useState } from "react";
import CalenderInfo from "./CalenderInfo";
import MyCalenderList from "./MyCalenderList";

const Calender = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [selectedDay, setSelectedDay] = useState({ year: null, month: null, date: null });
  const [isLoading, setIsLoading] = useState(true);
  const userMail = sessionStorage.getItem('userMail');

  useEffect(() => {
    const fetchTeams = async () => {
      const res = await fetch(`/api/teams/mail/${userMail}`);
      if (res.ok) {
        const data = await res.json();
        setTeams(data);
      } else {
        alert(await res.text());
      }
    };
    fetchTeams();
  }, [userMail]);

  useEffect(() => {
    const fetchGames = async () => {
      const allGames = [];
      for (const team of teams) {
        const res = await fetch(`/api/games/team/${team.teamId}`);
        if (res.ok) {
          const data = await res.json();
          const filtered = data.filter((g) => dayjs(g.date).isSame(currentDate, 'month'));
          allGames.push(...filtered.map((g) => ({ ...g, team })));
        }
      }
      setGames(allGames);
      setIsLoading(false);
    };

    if (teams.length > 0) fetchGames();
  }, [teams, currentDate]);

  if (isLoading) return <div style={{ padding: '3vh', textAlign: 'center' }}>불러오는 중...</div>;

  return (
    <>
      <CalenderInfo
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        games={games}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <MyCalenderList games={games} selectedDay={selectedDay} />
    </>
  )
}

export default Calender;
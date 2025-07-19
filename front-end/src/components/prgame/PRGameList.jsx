import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PRGame from './PRGame';

const PRGameList = () => {
  const { quarterId } = useParams();
  const gameId = sessionStorage.getItem('gameId');
  const userMail = sessionStorage.getItem('userMail');
  const [data, setData] = useState([]);

  /* 데이터 로딩 */
  useEffect(() => {
    (async () => {
      const prRes = await fetch(
        `http://52.78.12.127:8080/api/pr-games/findByQuarterId/${quarterId}`,
      );
      const gRes = await fetch(
        `http://52.78.12.127:8080/api/games/game/${gameId}`,
      );
      if (!prRes.ok || !gRes) return;
      const pr = await prRes.json();
      const gm = await gRes.json();
      const tRes = await fetch(
        `http://52.78.12.127:8080/api/teams/${gm.teamId}`,
      );
      const team = await tRes.json();
      const isManager = userMail == team.teamManagerMail;
      setData(isManager ? pr : pr.filter((p) => p.userMail == userMail));
    })();
  }, [gameId, userMail]);

  /* 삭제 */
  const handleDelete = async (id) => {
    if (!confirm('정말 삭제할까요?')) return;
    const res = await fetch(
      `http://52.78.12.127:8080/api/pr-games/remove/${id}`,
      { method: 'DELETE' },
    );
    if (res.ok) setData((p) => p.filter((g) => g.prGameId !== id));
    else alert(await res.text());
  };

  return (
    <div className="flex flex-col items-center gap-[2vh] px-[2vw] py-[4vh]">
      {data.map((prGame) => (
        <PRGame key={prGame.prGameId} prGame={prGame} />
      ))}
    </div>
  );
};

export default PRGameList;

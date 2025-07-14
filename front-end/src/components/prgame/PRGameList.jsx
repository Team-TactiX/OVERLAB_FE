import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PRGameList = () => {
  const { gameId } = useParams();
  const navigate   = useNavigate();
  const userMail   = sessionStorage.getItem('userMail');
  const [data, setData] = useState([]);

  /* 데이터 로딩 */
  useEffect(() => {
    (async () => {
      const prRes = await fetch(`http://52.78.12.127:8080/api/pr-games/findByGameId/${gameId}`);
      const gRes  = await fetch(`http://52.78.12.127:8080/api/games/saved-formation/${gameId}`);
      if (!prRes.ok || !gRes.ok) return;
      const pr = await prRes.json();
      const gm = await gRes.json();
      const isManager = userMail === gm.team.teamManager.userMail;
      setData(isManager ? pr : pr.filter(p => p.user.userMail === userMail));
    })();
  }, [gameId, userMail]);

  /* 삭제 */
  const handleDelete = async (id) => {
    if (!confirm('정말 삭제할까요?')) return;
    const res = await fetch(`http://52.78.12.127:8080/api/pr-games/remove/${id}`,{method:'DELETE'});
    if (res.ok) setData(p=>p.filter(g=>g.prGameId!==id));
    else alert(await res.text());
  };

  return (
    <div className="flex flex-col items-center gap-[2vh] px-[2vw] py-[4vh]">
      {data.map(c => (
        <div
          key={c.prGameId}
          className="relative w-full max-w-[760px] flex items-start justify-between
                     px-[3vh] py-[2.2vh] rounded-[1.4vh]
                     bg-white shadow-[0_6px_28px_rgba(0,0,0,0.08)]
                     border border-white/60"
        >
          {/* 좌측 포인트 라인 */}
          <div className="absolute left-0 top-0 h-full w-[4px] bg-gradient-to-b from-[#00dc6b] to-[#00c851] rounded-l-[1.4vh]" />

          {/* ‘포메이션’ 라벨 */}
          <span className="absolute -top-[1.3vh] left-[1.4vh] px-[1.2vh] py-[0.4vh]
                           text-[1.2vh] font-semibold uppercase tracking-wide
                           bg-emerald-500 text-white rounded-[0.8vh] shadow-md">
            포메이션
          </span>

          {/* 카드 본문 */}
          <div className="flex flex-col gap-[0.6vh] pr-[2vh] break-keep ">
            <p className="text-[2.2vh] font-extrabold text-[#111827] leading-tight">
              {c.prGameName || '제목 없음'}
            </p>
            <p className="text-[1.55vh] text-[#6b7280] leading-snug">
              작성자: {c.user?.userName || '익명'}
            </p>
          </div>

          {/* 액션 버튼들 */}
          <div className="flex-shrink-0 flex gap-[0.2vh]">
            <button
              onClick={()=> navigate(`/pr/${c.prGameId}`)}
              className="h-[3.8vh] px-[2.4vh] rounded-full border-2 border-emerald-500
                         text-emerald-600 font-semibold text-[1.55vh]
                         hover:bg-emerald-500 hover:text-white transition
                         mr-[1vh]"
                         
            >
              포메이션 보기
            </button>
            <button
              onClick={()=> handleDelete(c.prGameId)}
              className="h-[3.8vh] px-[2.4vh] rounded-full border-2 border-red-500
                         text-red-600 font-semibold text-[1.55vh]
                         hover:bg-red-500 hover:text-white transition
                         "
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PRGameList;

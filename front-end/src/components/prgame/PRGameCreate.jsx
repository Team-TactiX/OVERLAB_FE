import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import field from '../../img/field.png';
import playerIcon from '../../img/player.png';
import uniformIcon from '../../img/uniform.png';
import grayUniformIcon from '../../img/grayUniform.png'

const PRGameCreate = ({
  game,
  setGame,
  users,
  setIsOpen,
  setSelectedPositionKey,
  positionList,
  getCount,
}) => {
  const { gameId } = useParams();
  const count = getCount();
  const userMail = sessionStorage.getItem('userMail');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handlePositionClick = (positionKey) => {
    setSelectedPositionKey(positionKey);
    setIsOpen(true);
  };

  const handleResetFormation = () => {
    positionList.forEach(({ key }) => {
      setGame((prev) => ({ ...prev, [key]: null }));
    });
  };

  const handleRequestPRGame = async () => {
    if (!game) return;
    const payload = {
      prGameName: title,
      game: { gameId: Number(gameId) },
      user: { userMail },
    };
    positionList.forEach(({ key }) => {
      const u = game[key];
      if (u?.userMail) payload[key] = { userMail: u.userMail };
    });

    try {
      const res = await fetch('http://52.78.12.127:8080/api/pr-games/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(`요청 실패: ${data.message || '서버 오류'}`);
      } else {
        alert('PR 경기가 성공적으로 저장되었습니다.');
        navigate(`/pr/list/${gameId}`);
      }
    } catch {
      alert('요청 중 예외가 발생했습니다.');
    }
  };

  if (!game) return <div className="text-center pt-[10vh]">로딩 중...</div>;

  return (
    <div className="min-h-[100vh] w-full bg-[#f9f9f9] flex flex-col items-center pt-[0vh]">
      <div className="w-full max-w-[90vh] bg-f9f9f9 rounded-xl px-[3vw] pt-[3vh] pb-[4vh]">
        {/* 제목 입력 */}
        <input
          type="text"
          placeholder="포메이션 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-[5.5vh] mb-[2vh] text-center text-[2.2vh] rounded-[1vh] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00b894]"
        />

        {/* 참석 인원 */}
        <h2 className="mb-[2vh] text-center text-[1.8vh] font-medium">
          Starting : {users.length} | <span className="text-green-500">Lineup: {count}</span> 
        </h2>

        {/* 필드 */}
        <div className="-mx-[3vw] mb-[2vh]">
          <div
            className="relative w-full h-[48vh]"
            style={{
              backgroundImage: `url(${field})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-1">
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
                    game[key]
                      ? !game?.team?.users?.some(user => user.userMail === game[key].userMail)
                        ? grayUniformIcon
                        : uniformIcon
                      : playerIcon
                  }
                  alt="player"
                  className="w-[4.5vh] h-[4.5vh] object-contain"
                />
                <span className="text-white font-bold text-[1.8vh] whitespace-nowrap drop-shadow-[0_0_0.6vh_black] mt-[-2vh]">
                  {game[key] ? game[key].userName : label}
                </span>
              </div>
            </button>
          ))}
            </div>
          </div>
        </div>

        {/* 버튼 */}
        {/* 포메이션 요청 버튼 */}
<button
  onClick={handleRequestPRGame}
  className="flex items-center justify-center gap-2 bg-[#00C851] text-white font-semibold text-[1.8vh] rounded-[3vh] h-[5.5vh] w-full shadow-md hover:bg-[#00b44b] hover:-translate-y-[0.3vh] hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-200"
>
  <span className="text-[2vh]">📌</span>
  <span className="tracking-wide">포메이션 요청</span>
</button>

{/* 포메이션 초기화 버튼 */}
<button
  onClick={handleResetFormation}
  className="flex items-center justify-center gap-2 bg-[#FFCDD2] text-[#B71C1C] font-semibold text-[1.8vh] rounded-[3vh] h-[5.5vh] w-full shadow-md hover:bg-[#EF9A9A] hover:-translate-y-[0.3vh] hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-200 mt-[1.2vh]"
>
  <span className="text-[2vh]">♻️</span>
  <span className="tracking-wide">포메이션 초기화</span>
</button>

      </div>
    </div>
  );
};

export default PRGameCreate;

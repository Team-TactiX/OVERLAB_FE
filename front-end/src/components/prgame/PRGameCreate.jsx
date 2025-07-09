import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import field from '../../img/field.png';
import playerIcon from '../../img/player.png';

const PRGameCreate = ({ game, setGame, users, setIsOpen, setSelectedPositionKey, positionList, getCount }) => {
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
      setGame((prevGame) => ({ ...prevGame, [key]: null }));
    })
  }

  const handleRequestPRGame = async () => {
    if (!game) return;

    const prGamePayload = {
      prGameName: title,
      game: { gameId: Number(gameId) },
      user: { userMail },
    };

    positionList.forEach(({ key }) => {
      const user = game[key];
      if (user?.userMail) {
        prGamePayload[key] = { userMail: user.userMail };
      }
    });

    try {
      const res = await fetch('http://52.78.12.127:8080/api/pr-games/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prGamePayload),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(`요청 실패: ${data.message || '서버 오류'}`);
      } else {
        alert('PR 경기가 성공적으로 저장되었습니다.');
        navigate(`/pr/list/${gameId}`);
      }
    } catch (err) {
      console.error(err);
      alert('요청 중 예외가 발생했습니다.');
    }
  };

  if (!game) return <div className="text-center pt-[10vh]">로딩 중...</div>;

  return (
    <div className="min-h-[100vh] w-full bg-[#f9f9f9] flex justify-center py-[10vh]">
      <div className="w-full max-w-[60vh] bg-white rounded-xl p-[3vh_3vw] shadow-lg animate-fadeUp">
        <input
          type="text"
          placeholder="포메이션 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-[5.5vh] mb-[3vh] text-center text-[2.2vh] rounded-[1vh] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00b894]"
        />
        <h2>참석인원 : {users.length} | 참가인원 : {count}</h2>
        <div
        className="relative w-[49vh] h-[42vh] mb-[4vh]"
        style={{ backgroundImage: `url(${field})`, backgroundSize: '100% 100%' }}
      >
        <div className="absolute w-full h-full">
          {positionList.map(({ key, label, top, left }) =>
           (
              <button key={key} onClick={() => handlePositionClick(key)}>
                <div
                  className="absolute flex items-center justify-center"
                  style={{ top: top, left: left }}
                >
                  <img src={playerIcon} alt="player" className="w-[4.5vh] h-[4.5vh] object-contain" />
                </div>
                <span
                  className="absolute text-white font-bold text-[1.8vh] whitespace-nowrap drop-shadow-[0_0_0.6vh_black]"
                  style={{
                    top: key === 'gkId' ? `calc(${top} + 2.5vh)` : `calc(${top} + 2.5vh)`,
                    left: left,
                  }}
                >
                 {game[key] ? game[key].userName : label}
                </span>
              </button>
            )
          )}
        </div>
      </div>
        <button
          onClick={handleRequestPRGame}
          className="w-full bg-[#00b894] text-white py-[1.4vh] text-[2vh] rounded-full hover:bg-[#00a57a] active:scale-95 transition"
        >
          포메이션 요청
        </button>
        <button
          onClick={handleResetFormation}
          className="w-full bg-[#00b894] text-white py-[1.4vh] text-[2vh] rounded-full hover:bg-[#00a57a] active:scale-95 transition"
        >
          포메이션 초기화
        </button>
      </div>
    </div>
  );
};

export default PRGameCreate;

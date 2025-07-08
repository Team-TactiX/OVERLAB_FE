import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import field from '../../img/field.png';

const PRGameCreate = ({ game, setGame, setUsers, setIsOpen, setSelectedPositionKey }) => {
  const { gameId } = useParams();
  const userMail = sessionStorage.getItem('userMail');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const positionList = [
    { key: 'stId', label: 'ST', top: '1vh', left: '22.3vh' },
    { key: 'lsId', label: 'LS', top: '4vh', left: '11.6vh' },
    { key: 'rsId', label: 'RS', top: '4vh', left: '29vh' },
    { key: 'lwId', label: 'LW', top: '7vh', left: '3.6vh' },
    { key: 'cfId', label: 'CF', top: '7vh', left: '22.3vh' },
    { key: 'rwId', label: 'RW', top: '7vh', left: '37.6vh' },
    { key: 'lamId', label: 'LAM', top: '13vh', left: '11.6vh' },
    { key: 'camId', label: 'CAM', top: '13vh', left: '22.3vh' },
    { key: 'ramId', label: 'RAM', top: '13vh', left: '29vh' },
    { key: 'lmId', label: 'LM', top: '19vh', left: '3vh' },
    { key: 'lcmId', label: 'LCM', top: '19vh', left: '11.6vh' },
    { key: 'cmId', label: 'CM', top: '19vh', left: '22.3vh' },
    { key: 'rcmId', label: 'RCM', top: '19vh', left: '29vh' },
    { key: 'rmId', label: 'RM', top: '19vh', left: '37.6vh' },
    { key: 'lwbId', label: 'LWB', top: '25vh', left: '3vh' },
    { key: 'ldmId', label: 'LDM', top: '25vh', left: '11.6vh' },
    { key: 'cdmId', label: 'CDM', top: '25vh', left: '22.3vh' },
    { key: 'rdmId', label: 'RDM', top: '25vh', left: '29vh' },
    { key: 'rwbId', label: 'RWB', top: '25vh', left: '37.6vh' },
    { key: 'lbId', label: 'LB', top: '31vh', left: '3vh' },
    { key: 'lcbId', label: 'LCB', top: '31vh', left: '11.6vh' },
    { key: 'swId', label: 'SW', top: '31vh', left: '22.3vh' },
    { key: 'rcbId', label: 'RCB', top: '31vh', left: '29vh' },
    { key: 'rbId', label: 'RB', top: '31vh', left: '37.6vh' },
    { key: 'gkId', label: 'GK', top: '37vh', left: '22.3vh' },
  ];

  const handlePositionClick = (positionKey) => {
    setSelectedPositionKey(positionKey);
    setIsOpen(true);
  };

  useEffect(() => {
    const fetchGame = async () => {
      const res = await fetch(`http://52.78.12.127:8080/api/games/saved-formation/${gameId}`);
      const data = await res.json();
      setGame(data);
      setUsers(data.playersMail);
    };

    fetchGame();
  }, [gameId]);

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
        <div
          className="relative w-[49vh] h-[42vh] mb-[4vh]"
          style={{ backgroundImage: `url(${field})`, backgroundSize: '100% 100%' }}
        >
          <div className="absolute w-full h-full">
            {positionList.map(({ key, label, top, left }) => (
              <button
                key={key}
                className="absolute flex items-center justify-center bg-yellow-200 text-black border border-black rounded-full w-[8.2vh] h-[4vh] text-[1.5vh] hover:scale-105 transition"
                style={{ top: top, left: left }}
                onClick={() => handlePositionClick(key)}
              >
                {game[key] ? game[key].userName : label}
              </button>
            ))}
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

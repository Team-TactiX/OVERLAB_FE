import styled from 'styled-components';
import field from '../../img/field.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import playerIcon from '../../img/player.png';

const PRGameContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 9vh;
`;

const ChangeButton = styled.button`
  background-color: black;
  color: white;
  width: 40vh;
  height: 6vh;
  font-size: 2vh;
  border-radius: 0.7vh;
  margin-bottom: 2vh;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

const PRGame = ({ prGameId, setUpdate, users, getPRCount, positionList }) => {
  const gameId = sessionStorage.getItem('gameId');
  const userMail = sessionStorage.getItem('userMail');
  const count = getPRCount();
  const [game, setGame] = useState(null);
  const [prGame, setPrGame] = useState(null);
  const [authorMail, setAuthorMail] = useState(null);
  const [teamManagerMail, setTeamManagerMail] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGame = async () => {
      const res = await fetch(`http://52.78.12.127:8080/api/pr-games/findByPRGameId/${prGameId}`);
      const prData = await res.json();
      setPrGame(prData);
      setAuthorMail(prData.user.userMail)

      const response = await fetch(`http://52.78.12.127:8080/api/games/saved-formation/${gameId}`);
      const gameData = await response.json();
      setGame(gameData);
      setTeamManagerMail(gameData.team.teamManager.userMail)
    };

    fetchGame();
  }, [prGameId, gameId]);

  const margeGame = async () => {
    try {
      const res = await fetch('http://52.78.12.127:8080/api/games/change-from-pr-to-game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prGameId }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`변환 실패: ${data.message || '서버 오류'}`);
      } else {
        alert('PR 포메이션이 실제 경기 포지션으로 적용되었습니다.');
        navigate(`/game/${gameId}`);
      }
    } catch (error) {
      console.error('예외 발생:', error);
      alert('요청 중 문제가 발생했습니다.');
    }
  };

  const isAuthor = authorMail === userMail;
  const isManager = teamManagerMail === userMail;

  if (!game) return <div>로딩 중...</div>;

  return (
    <PRGameContainer>
      <h2>{prGame?.prGameName}</h2>
      <h2>Starting : {users.length} | <span className="text-green-500">Lineup: {count}</span> </h2>
      <div className="relative w-[49vh] h-[42vh] mb-[4vh] ml-[1vw]"
        style={{ backgroundImage: `url(${field})`, backgroundSize: '100% 100%' }}
      >
        <div className="absolute w-full h-full">
          {positionList.map(({ key, label, top, left }) =>
           prGame[key] &&  (
              <button key={key}>
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
                  {prGame[key]?.userName ||  label}
                </span>
              </button>
            )
          )}
        </div>
      </div>
      {isAuthor && (<ChangeButton onClick={() => setUpdate(true)}>수정</ChangeButton>)}
      {isManager && (<ChangeButton onClick={margeGame}>포메이션 적용</ChangeButton>)}
    </PRGameContainer>
  );
};

export default PRGame;

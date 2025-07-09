import styled from 'styled-components';
import field from '../../img/field.png';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import playerIcon from '../../img/player.png';

const PositionContainer = styled.div`
  padding: 10vh 2vw 10vh;
  max-width: 768px;
  margin: 0 auto;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const GameUpdate = ({ setUpdate, setSelectedPositionKey, setUsers, setIsOpen, game, setGame, positionList, getCount, users }) => {
  const { gameId } = useParams();
  const count = getCount();

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


  const handleSubmit = async () => {
    try {
      const response = await fetch('http://52.78.12.127:8080/api/games/update-game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(game),
      });

      if (response.ok) {
        alert('포지션이 저장되었습니다.');
        setUpdate(false)
      } else {
        alert('저장 실패: ' + (await response.text()));
      }
    } catch (err) {
      console.error(err);
      alert('서버 오류 발생');
    }
  };

  if (!game) return <div>로딩 중...</div>;

  return (
    <PositionContainer>
      <h2>
        {game.date.slice(0, 10)} {game.gameName}
      </h2>
      <h2>참석인원 : {users.length} | 참가인원 : {count}</h2>
      <div
        className="relative w-[49vh] h-[42vh] mb-[4vh]"
        style={{ backgroundImage: `url(${field})`, backgroundSize: '100% 100%' }}
      >
        <div className="absolute w-full h-full">
          {positionList.map(({ key, label, top, left }) =>
            (
              <button key={key}  onClick={() => handlePositionClick(key)}>
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
      <ChangeButton onClick={() => setUpdate(false)}>뒤로가기</ChangeButton>
      <ChangeButton onClick={handleSubmit}>저장</ChangeButton>
    </PositionContainer>
  );
};

export default GameUpdate;

import styled from 'styled-components';
import field from '../../img/field.png';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const PositionContainer = styled.div`
  padding: 7vh 2vw 10vh;
  max-width: 768px;
  margin: 0 auto;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const FieldWrapper = styled.div`
  position: relative;
  width: 49vh;
  height: 42vh;
  background-image: url(${field});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 2vh;
`;

const ButtonBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const StyledButton = styled.button`
  position: absolute; /* 절대 위치 */
  top: ${(props) => props.$top}; /* 상단 여백 */
  left: ${(props) => props.$left}; /* 우측 여백 */
  display: flex; /* 내부 정렬 위해 flex 사용 */
  justify-content: center; /* 수평 가운데 */
  align-items: center;
  background-color: rgba(240, 228, 57, 0.5); /* 반투명 배경 */
  color: black;
  border: 2px solid black;
  border-radius: 20vh;
  cursor: pointer;
  width: 8.2vh;
  height: 4vh;
  font-size: 1.5vh;
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

const GameUpdate = ({ setUpdate, setSelectedPositionKey, setUsers, setIsOpen, game, setGame }) => {
  const { gameId } = useParams();

  const positionList = [
    { key: 'stId', label: 'ST', top: '1vh', left: '20.3vh' },
    { key: 'lsId', label: 'LS', top: '4vh', left: '11.6vh' },
    { key: 'rsId', label: 'RS', top: '4vh', left: '29vh' },
    { key: 'lwId', label: 'LW', top: '7vh', left: '3.6vh' },
    { key: 'cfId', label: 'CF', top: '7vh', left: '20.3vh' },
    { key: 'rwId', label: 'RW', top: '7vh', left: '37.6vh' },
    { key: 'lamId', label: 'LAM', top: '13vh', left: '11.6vh' },
    { key: 'camId', label: 'CAM', top: '13vh', left: '20.3vh' },
    { key: 'ramId', label: 'RAM', top: '13vh', left: '29vh' },
    { key: 'lmId', label: 'LM', top: '19vh', left: '3vh' },
    { key: 'lcmId', label: 'LCM', top: '19vh', left: '11.6vh' },
    { key: 'cmId', label: 'CM', top: '19vh', left: '20.3vh' },
    { key: 'rcmId', label: 'RCM', top: '19vh', left: '29vh' },
    { key: 'rmId', label: 'RM', top: '19vh', left: '37.6vh' },
    { key: 'lwbId', label: 'LWB', top: '25vh', left: '3vh' },
    { key: 'ldmId', label: 'LDM', top: '25vh', left: '11.6vh' },
    { key: 'cdmId', label: 'CDM', top: '25vh', left: '20.3vh' },
    { key: 'rdmId', label: 'RDM', top: '25vh', left: '29vh' },
    { key: 'rwbId', label: 'RWB', top: '25vh', left: '37.6vh' },
    { key: 'lbId', label: 'LB', top: '31vh', left: '3vh' },
    { key: 'lcbId', label: 'LCB', top: '31vh', left: '11.6vh' },
    { key: 'swId', label: 'SW', top: '31vh', left: '20.3vh' },
    { key: 'rcbId', label: 'RCB', top: '31vh', left: '29vh' },
    { key: 'rbId', label: 'RB', top: '31vh', left: '37.6vh' },
    { key: 'gkId', label: 'GK', top: '37vh', left: '20.3vh' },
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


  const handleSubmit = async () => {
    try {
      const payload = { ...game };

      // 각 포지션 키의 값이 user 객체이면 userMail만 추출
      for (const key in payload) {
        if (
          payload[key] &&
          typeof payload[key] === 'object' &&
          payload[key].userMail
        ) {
          payload[key] = payload[key].userMail;
        }
      }
      const response = await fetch('/api/games/update-game', {
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
      <FieldWrapper>
        <ButtonBox>
          {positionList.map(({ key, label, top, left }) => (
            <StyledButton key={key} $top={top} $left={left} onClick={() => handlePositionClick(key)}>
              {game[key] ? game[key].userName : label}
            </StyledButton>
          ))}
        </ButtonBox>
      </FieldWrapper>
      <ChangeButton onClick={() => setUpdate(false)}>뒤로가기</ChangeButton>
      <ChangeButton onClick={handleSubmit}>저장</ChangeButton>
    </PositionContainer>
  );
};

export default GameUpdate;

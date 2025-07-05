import styled from 'styled-components';
import field from '../../img/field.png';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PRGameCreatePageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
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

const TitleInput = styled.input`
  height: 4vh;
  width: 60%;
  margin: 2vh auto;
  font-size: 2.5vh;
  text-align: center;
`;

const ButtonBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const StyledButton = styled.button`
  position: absolute;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  width: 8.2vh;
  height: 4vh;
  background-color: rgba(240, 228, 57, 0.5);
  color: black;
  border: 2px solid black;
  border-radius: 20vh;
  font-size: 1.5vh;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChangeButton = styled.button`
  background-color: black;
  color: white;
  width: 40vh;
  height: 6vh;
  font-size: 2vh;
  border-radius: 0.7vh;
  margin-bottom: 2vh;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

const PRGameCreate = ({ setUsers, setIsOpen, setSelectedPositionKey }) => {
  const { gameId } = useParams();
  const userMail = sessionStorage.getItem('userMail');
  const [game, setGame] = useState(null);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

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
      const filtereddData = data.playersMail.filter((player) => player.userMail !== userMail);
      setGame(filtereddData);
      setUsers(data.playersMail);
    };

    fetchGame();
  }, [gameId]);



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
      console.error('예외 발생:', err);
      alert('요청 중 예외가 발생했습니다.');
    }
  };

  if (!game) return <div>로딩 중...</div>;

  return (
    <PRGameCreatePageContainer>
      <TitleInput
        placeholder="포지션 이름"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <FieldWrapper>
        <ButtonBox>
          {positionList.map(({ key, label, top, left }) => (
            <StyledButton
              key={key}
              $top={top}
              $left={left}
              onClick={() => handlePositionClick(key)}
            >
              {game[key]?.userName || label}
            </StyledButton>
          ))}
        </ButtonBox>
      </FieldWrapper>
      <ChangeButton onClick={handleRequestPRGame}>포메이션 요청</ChangeButton>
    </PRGameCreatePageContainer>
  );
};

export default PRGameCreate;

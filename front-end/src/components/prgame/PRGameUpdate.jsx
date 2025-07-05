import styled from 'styled-components';
import field from '../../img/field.png';
import { useEffect, useMemo, useState } from 'react';

const PRGameUpdatePageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding-top: 8vh;
`;

const FieldWrapper = styled.div`
  position: relative;
  width: 49vh;
  height: 42vh;
  background-image: url(${field});
  background-size: 100% 100%; // ✅ 강제로 꽉 채움 (비율 무시)
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 2vh;
`;

const TitleInput = styled.input`
  height: 4vh;
  width: 60%;
  display: block;
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

const PRGameUpdate = ({prGameId, setUpdate, setSelectedPositionKey, setIsOpen, prGame,  game }) => {
  const gameId = sessionStorage.getItem('gameId');
  const userMail = sessionStorage.getItem('userMail');
  const [title, setTitle] = useState();

  const positionKeyToRole = useMemo(
    () => ({
      stId: 'ST',
      lsId: 'LS',
      rsId: 'RS',
      lwId: 'LW',
      rwId: 'RW',
      cfId: 'CF',
      camId: 'CAM',
      lamId: 'LAM',
      ramId: 'RAM',
      cmId: 'CM',
      lcmId: 'LCM',
      rcmId: 'RCM',
      lmId: 'LM',
      rmId: 'RM',
      cdmId: 'CDM',
      ldmId: 'LDM',
      rdmId: 'RDM',
      lwbId: 'LWB',
      rwbId: 'RWB',
      lbId: 'LB',
      rbId: 'RB',
      lcbId: 'LCB',
      rcbId: 'RCB',
      swId: 'SW',
      gkId: 'GK',
    }),
    [],
  );

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

  useEffect(() => {
    const fetchGame = async () => {
      const positionKeys = Object.keys(positionKeyToRole);
      positionKeys.forEach((key) => {
        if (prGame[key]) {
          game[key] = prGame[key];
        }
      });
    };

    fetchGame();
  }, [prGame, game]);

  const handlePositionClick = (positionKey) => {
    setSelectedPositionKey(positionKey);
    setIsOpen(true);
  };

  const handleRequestPRGame = async () => {
    if (!game) return;

    const positionKeys = Object.keys(positionKeyToRole);

    const prGamePayload = {
      prGameId: prGameId,
      prGameName: title,
      game: { gameId: Number(gameId) },
      user: {
        userMail: userMail,
      },
    };

    // 포지션 키에 따라 userMail이 할당된 경우만 포함
    positionKeys.forEach((key) => {
      const user = game[key];
      if (user && user.userMail) {
        prGamePayload[key] = { userMail: user.userMail };
      }
    });

    try {
      const res = await fetch('http://52.78.12.127:8080/api/pr-games/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prGamePayload),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error('서버 응답 오류:', data);
        alert(`요청 실패: ${data.message || '서버 오류'}`);
      } else {
        alert('PR 경기가 성공적으로 저장되었습니다.');
        setUpdate(false);
      }
    } catch (err) {
      console.error('예외 발생:', err);
      alert('요청 중 예외가 발생했습니다.');
    }
  };

  if (!game) return <div>로딩 중...</div>;

  return (
    <PRGameUpdatePageContainer>
      <TitleInput value={title} onChange={(e) => setTitle(e.target.value)} />
      <FieldWrapper>
        <ButtonBox>
          {positionList.map(({ key, label, top, left }) => (
            <StyledButton key={key} $top={top} $left={left} onClick={() => handlePositionClick(key)}>
              {prGame[key] ? prGame[key].userName : label}
            </StyledButton>
          ))}
        </ButtonBox>
      </FieldWrapper>
      <ChangeButton onClick={() => handleRequestPRGame()}>
      포메이션 요청 수정
      </ChangeButton>
    </PRGameUpdatePageContainer>
  );
};

export default PRGameUpdate;

import styled from 'styled-components';
import field from '../../img/field.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PRGameContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 9vh;
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
  position: absolute;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(240, 228, 57, 0.7);
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

const PRGame = ({ prGameId, setUpdate }) => {
  const gameId = sessionStorage.getItem('gameId');
  const userMail = sessionStorage.getItem('userMail');
  const [game, setGame] = useState(null);
  const [prGame, setPrGame] = useState(null);
  const [authorMail, setAuthorMail] = useState(null);
  const [teamManagerMail, setTeamManagerMail] = useState(null);

  const navigate = useNavigate();

  const positionKeys = [
    'stId', 'lsId', 'rsId', 'lwId', 'rwId', 'cfId', 'camId', 'lamId', 'ramId', 'cmId',
    'lcmId', 'rcmId', 'lmId', 'rmId', 'cdmId', 'ldmId', 'rdmId', 'lwbId', 'rwbId', 'lbId',
    'rbId', 'lcbId', 'rcbId', 'swId', 'gkId'
  ];

  const positionMap = {
    stId: { top: '1vh', left: '20.3vh' },
    lsId: { top: '4vh', left: '11.6vh' },
    rsId: { top: '4vh', left: '29vh' },
    lwId: { top: '7vh', left: '3.6vh' },
    cfId: { top: '7vh', left: '20.3vh' },
    rwId: { top: '7vh', left: '37.6vh' },
    lamId: { top: '13vh', left: '11.6vh' },
    camId: { top: '13vh', left: '20.3vh' },
    ramId: { top: '13vh', left: '29vh' },
    lmId: { top: '19vh', left: '3vh' },
    lcmId: { top: '19vh', left: '11.6vh' },
    cmId: { top: '19vh', left: '20.3vh' },
    rcmId: { top: '19vh', left: '29vh' },
    rmId: { top: '19vh', left: '37.6vh' },
    lwbId: { top: '25vh', left: '3vh' },
    ldmId: { top: '25vh', left: '11.6vh' },
    cdmId: { top: '25vh', left: '20.3vh' },
    rdmId: { top: '25vh', left: '29vh' },
    rwbId: { top: '25vh', left: '37.6vh' },
    lbId: { top: '31vh', left: '3vh' },
    lcbId: { top: '31vh', left: '11.6vh' },
    swId: { top: '31vh', left: '20.3vh' },
    rcbId: { top: '31vh', left: '29vh' },
    rbId: { top: '31vh', left: '37.6vh' },
    gkId: { top: '37vh', left: '20.3vh' },
  };

  useEffect(() => {
    const fetchGame = async () => {
      const res = await fetch(`/api/pr-games/findByPRGameId/${prGameId}`);
      const prData = await res.json();
      setPrGame(prData);
      setAuthorMail(prData.user.userMail)

      const response = await fetch(`/api/games/saved-formation/${gameId}`);
      const gameData = await response.json();
      setGame(gameData);
      setTeamManagerMail(gameData.team.teamManager.userMail)
    };

    fetchGame();
  }, [prGameId, gameId]);

  const margeGame = async () => {
    try {
      const res = await fetch('/api/games/change-from-pr-to-game', {
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
      <FieldWrapper>
        <ButtonBox>
          {positionKeys.map((key) => (
            prGame[key] && (
              <StyledButton
                key={key}
                $top={positionMap[key].top}
                $left={positionMap[key].left}
              >
                {prGame[key]?.userName || key.replace('Id', '')}
              </StyledButton>
            )
          ))}
        </ButtonBox>
      </FieldWrapper>
      {isAuthor && (<ChangeButton onClick={() => setUpdate(true)}>수정</ChangeButton>)}
      {isManager && (<ChangeButton onClick={margeGame}>포메이션 적용</ChangeButton>)}
    </PRGameContainer>
  );
};

export default PRGame;

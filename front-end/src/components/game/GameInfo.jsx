import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import field from '../../img/field.png';
import useGameData from '../../hooks/useGameData';
import GameJoin from './GameJoin';
import GameDelete from './GameDelete';

const PageWrapper = styled.div`
  padding: 8vh 2vw 5vh;
  display: flex;
  justify-content: center;
  background-color: #f9f9f9;
`;

const Card = styled.div`
  width: 90%;
  max-width: 60vh;
  background-color: #fff;
  border-radius: 12px;
  padding: 3vh 3vw;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`;

const StyledTitle = styled.h1`
  font-size: 2.4vh;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3vh;
`;

const PositionFormContainer = styled.div`
  padding: 7vh 2vw 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
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

const ControlButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5vh;
  width: 100%;
  max-width: 60vh;
  margin-top: 3vh;
`;

const ChangeButton = styled.button`
  background-color: black;
  color: white;
  width: 100%;
  height: 5.5vh;
  font-size: 1.8vh;
  border-radius: 1vh;
  margin: 0;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

const GameInfo = ({ setUpdate }) => {
  const { gameId } = useParams();
  const { game, users, teamId } = useGameData();
  const [hasPermission, setHasPermission] = useState(false);
  const [checked, setChecked] = useState(false);
  const userMail = sessionStorage.getItem('userMail');
  sessionStorage.setItem('teamId', teamId);

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
    const checkPermission = async () => {
      if (!userMail || !teamId) return;
      try {
        const response = await fetch(`http://52.78.12.127:8080/api/teams/${teamId}`);
        const data = await response.json();
        if (data.teamManager.userMail === userMail) {
          setHasPermission(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setChecked(true);
      }
    };
    checkPermission();
  }, [userMail, teamId]);

  const handleRemovePosition = async () => {
    try {
      const updated = Object.fromEntries(
        Object.entries(game).map(([key, value]) =>
          value?.userMail === userMail ? [key, null] : [key, value],
        )
      );
      const response = await fetch('/api/games/update-game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (!response.ok) alert(await response.text());
    } catch (err) {
      console.error(err);
      alert('포메이션 제거 중 오류');
    }
  };

  if (!checked) return <div>권한 확인 중...</div>;

  return (
    <PageWrapper>
      <Card>
        <StyledTitle>라인업 설정</StyledTitle>
        <PositionFormContainer>
          <h2>{game.date.slice(0, 10)} {game.gameName}</h2>
          <FieldWrapper>
            <ButtonBox>
              {positionList.map(({ key, top, left }) =>
                game[key] ? (
                  <StyledButton key={key} $top={top} $left={left}>
                    {game[key].userName}
                  </StyledButton>
                ) : null
              )}
            </ButtonBox>
          </FieldWrapper>

          <ControlButtonBox>
            <GameJoin
              userMail={userMail}
              users={users}
              gameId={gameId}
              hasPermission={hasPermission}
              handleRemovePosition={handleRemovePosition}
            />
            {hasPermission && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2vh' }}>
                <ChangeButton style={{ width: '13vh' }} onClick={() => setUpdate(true)}>
                  수정
                </ChangeButton>
                <GameDelete gameId={gameId} teamId={teamId} />
                <Link to={`/pr/list/${gameId}`}>
                  <ChangeButton style={{ width: '13vh' }}>요청 확인</ChangeButton>
                </Link>
              </div>
            )}
          </ControlButtonBox>
        </PositionFormContainer>
      </Card>
    </PageWrapper>
  );
};

export default GameInfo;
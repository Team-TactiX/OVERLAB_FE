import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import field from '../../img/field.png';
import playerIcon from '../../img/player.png';
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
  background-color: #f9f9f9;;
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

const PlayerCard = styled.div`
  position: absolute;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;

  img {
    width: 4.5vh;
    height: 4.5vh;
    object-fit: contain;
  }
`;

const PlayerName = styled.span`
  position: absolute;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  color: white;
  font-size: 1.8vh;
  font-weight: 700;
  white-space: nowrap;
  text-shadow: 0 0 0.5vh black, 0 0 1vh black;
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
    { key: 'stId', top: '1vh', left: '20.3vh' },
    { key: 'lsId', top: '3vh', left: '11.6vh' },
    { key: 'rsId', top: '3vh', left: '29vh' },
    { key: 'lwId', top: '6vh', left: '3.6vh' },
    { key: 'cfId', top: '6vh', left: '20.3vh' },
    { key: 'rwId', top: '6vh', left: '37.6vh' },
    { key: 'lamId', top: '12vh', left: '11.6vh' },
    { key: 'camId', top: '12vh', left: '20.3vh' },
    { key: 'ramId', top: '12vh', left: '29vh' },
    { key: 'lmId', top: '18vh', left: '3vh' },
    { key: 'lcmId', top: '18vh', left: '11.6vh' },
    { key: 'cmId', top: '18vh', left: '20.3vh' },
    { key: 'rcmId', top: '18vh', left: '29vh' },
    { key: 'rmId', top: '18vh', left: '37.6vh' },
    { key: 'lwbId', top: '24vh', left: '3vh' },
    { key: 'ldmId', top: '24vh', left: '11.6vh' },
    { key: 'cdmId', top: '24vh', left: '20.3vh' },
    { key: 'rdmId', top: '24vh', left: '29vh' },
    { key: 'rwbId', top: '24vh', left: '37.6vh' },
    { key: 'lbId', top: '30vh', left: '3vh' },
    { key: 'lcbId', top: '30vh', left: '11.6vh' },
    { key: 'swId', top: '30vh', left: '20.3vh' },
    { key: 'rcbId', top: '30vh', left: '29vh' },
    { key: 'rbId', top: '30vh', left: '37.6vh' },
    { key: 'gkId', top: '36vh', left: '20.3vh' },
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
      
      const response = await fetch('http://52.78.12.127:8080/api/games/update-game', {
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
                  <>
                    <PlayerCard key={key} $top={top} $left={left}>
                      <img src={playerIcon} alt="player" />
                    </PlayerCard>
                    <PlayerName
                      $top={key === 'gkId' ? `calc(${top} + 2vh)` : `calc(${top} + 2.5vh)`}
                      $left={left}
                    >
                      {game[key].userName}
                    </PlayerName>
                  </>
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

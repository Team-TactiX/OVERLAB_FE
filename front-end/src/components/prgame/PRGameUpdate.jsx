import styled from 'styled-components';
import field from '../../img/field.png';
import { useEffect, useState } from 'react';
import playerIcon from '../../img/player.png';

const PRGameUpdatePageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding-top: 8vh;
`;

const TitleInput = styled.input`
  height: 4vh;
  width: 60%;
  display: block;
  margin: 2vh auto;
  font-size: 2.5vh;
  text-align: center;
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

const PRGameUpdate = ({prGameId, setUpdate, setSelectedPositionKey, setIsOpen, prGame,  game, setGame, getPRCount, users, positionList }) => {
  const gameId = sessionStorage.getItem('gameId');
  const userMail = sessionStorage.getItem('userMail');
  const count = getPRCount();
  const [title, setTitle] = useState();

  useEffect(() => {
    const handleResetFormation = () => {
      positionList.forEach(({ key }) => {
        setGame((prevGame) => ({ ...prevGame, [key]: prGame[key] }));
      })
    }
    handleResetFormation();
  }, [prGame]);

  const handlePositionClick = (positionKey) => {
    setSelectedPositionKey(positionKey);
    setIsOpen(true);
  };

  const handleRequestPRGame = async () => {
    if (!game) return;

    const prGamePayload = {
      prGameId: prGameId,
      prGameName: title,
      game: { gameId: Number(gameId) },
      user: {
        userMail: userMail,
      },
    };

    // 포지션 키에 따라 userMail이 할당된 경우만 포함
    positionList.forEach(({ key }) => {
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
      <h2>Starting : {users.length} | <span className="text-green-500">Lineup: {count}</span> </h2>
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
                 {prGame[key] ? prGame[key].userName : label}
                </span>
              </button>
            )
          )}
        </div>
      </div>
      <ChangeButton onClick={() => handleRequestPRGame()}>
      포메이션 요청 수정
      </ChangeButton>
    </PRGameUpdatePageContainer>
  );
};

export default PRGameUpdate;

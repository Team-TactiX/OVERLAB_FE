import styled from 'styled-components';
import field from '../../img/field.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import playerIcon from '../../img/player.png';


/* ─── 레이아웃 ───────────────── */
const PRGameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12vh;
`;

/* 제목 전체 wrapper – 가로폭 고정 & 중앙 정렬 */
const TitleWrap = styled.div`
  position: relative;
  width: 100%;                 // ← 여기!
  margin-bottom: 3vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* 라벨 – 절대 위치 + 가운데 정렬 */
const Label = styled.span`
  position: absolute;
  top: -2.8vh;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(180deg, #02d157 0%, #00c851 100%);
  color: #fff;
  font-size: 1.45vh;
  font-weight: 700;
  letter-spacing: 0.04em;
  white-space: nowrap;
  padding: 0.1vh 1vh;
  border-radius: 3vh;
  box-shadow: 0 2px 6px rgba(0,0,0,.18);
  border: 1px solid rgba(255,255,255,0.4);
`;

/* 실제 포메이션 제목 */
const FormationTitle = styled.h2`
  display: inline-block;
  font-size: 2.6vh;
  font-weight: 800;
  letter-spacing: .03em;
  color: #2d3436;
  margin: 0;
  text-shadow: 0 0 0.4vh rgba(0,0,0,.25);
`;


/* 버튼 스택 */
const ButtonStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2vh;
  align-items: center;
`;

/* 아웃라인 버튼 */
const ChangeButton = styled.button.attrs({ type: 'button' })`
  width: 40vh;
  height: 5.5vh;
  border-radius: 3vh;
  font-size: 1.8vh;
  font-weight: 600;
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6vh;
  background: transparent;
  transition: all 180ms ease;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return `
          color:#00C851;
          border:2px solid #00C851;
          &:hover{
            background:rgba(0,200,81,0.10);
            box-shadow:0 6px 14px rgba(0,0,0,0.18);
            transform:translateY(-0.3vh) scale(1.05);
          }
        `;
      case 'danger':
        return `
          color:#E53935;
          border:2px solid #E53935;
          &:hover{
            background:rgba(229,57,53,0.12);
            box-shadow:0 6px 14px rgba(0,0,0,0.18);
            transform:translateY(-0.3vh) scale(1.05);
          }
        `;
      default:
        return `
          color:#666;
          border:2px solid #b3b3b3;
          &:hover{
            background:rgba(180,180,180,0.12);
            box-shadow:0 6px 14px rgba(0,0,0,0.18);
            transform:translateY(-0.3vh) scale(1.05);
          }
        `;
    }
  }}

  &:active {
    transform: scale(0.95);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
  &:disabled {
    color: #aaa;
    border-color: #aaa;
    box-shadow: none;
    cursor: not-allowed;
  }
`;
/* ───────────────────────────── */

const PRGame = ({ prGameId, setUpdate, users, getPRCount, positionList }) => {
  const gameId   = sessionStorage.getItem('gameId');
  const userMail = sessionStorage.getItem('userMail');
  const count    = getPRCount();

  const [game, setGame]                 = useState(null);
  const [prGame, setPrGame]             = useState(null);
  const [authorMail, setAuthorMail]     = useState(null);
  const [teamManagerMail, setTeamManagerMail] = useState(null);

  const navigate = useNavigate();

  /* 데이터 로딩 */
  useEffect(() => {
    (async () => {
      const prRes = await fetch(
        `http://52.78.12.127:8080/api/pr-games/findByPRGameId/${prGameId}`
      );
      const prData = await prRes.json();
      setPrGame(prData);
      setAuthorMail(prData.user.userMail);

      const gRes = await fetch(
        `http://52.78.12.127:8080/api/games/saved-formation/${gameId}`
      );
      const gData = await gRes.json();
      setGame(gData);
      setTeamManagerMail(gData.team.teamManager.userMail);
    })();
  }, [prGameId, gameId]);

  /* PR → 실제 경기 반영 */
  const margeGame = async () => {
    try {
      const res = await fetch(
        'http://52.78.12.127:8080/api/games/change-from-pr-to-game',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prGameId }),
        }
      );
      const data = await res.json();
      if (!res.ok) return alert(`변환 실패: ${data.message || '서버 오류'}`);
      alert('PR 포메이션이 실제 경기 포지션으로 적용되었습니다.');
      navigate(`/game/${gameId}`);
    } catch (e) {
      console.error(e);
      alert('요청 중 문제가 발생했습니다.');
    }
  };

  const isAuthor  = authorMail     === userMail;
  const isManager = teamManagerMail === userMail;

  if (!game) return <div>로딩 중...</div>;

  return (
    <PRGameContainer>
      <TitleWrap>
      <Label>포메이션</Label>
      <FormationTitle>{prGame?.prGameName || '제목없음'}</FormationTitle>
    </TitleWrap>
      <h2>
        Starting&nbsp;: {users.length} |{' '}
        <span className="text-green-500">Lineup: {count}</span>
      </h2>

      {/* 필드 */}
      <div
        className="relative w-[49vh] h-[42vh] mb-[4vh] ml-[1vw]"
        style={{ backgroundImage: `url(${field})`, backgroundSize: '100% 100%' }}
      >
        <div className="absolute w-full h-full">
          {positionList.map(({ key, label, top, left }) =>
            prGame[key] ? (
              <button key={key}>
                <div
                  className="absolute flex items-center justify-center"
                  style={{ top, left }}
                >
                  <img
                    src={playerIcon}
                    alt="player"
                    className="w-[4.5vh] h-[4.5vh] object-contain"
                  />
                </div>
                <span
                  className="absolute text-white font-bold text-[1.8vh] whitespace-nowrap drop-shadow-[0_0_0.6vh_black]"
                  style={{ top: `calc(${top} + 2.5vh)`, left }}
                >
                  {prGame[key]?.userName || label}
                </span>
              </button>
            ) : null
          )}
        </div>
      </div>

      {/* 버튼 영역 */}
      <ButtonStack>
        {isAuthor && (
          <ChangeButton variant="danger" onClick={() => setUpdate(true)}>
            ✏️&nbsp;수정
          </ChangeButton>
        )}
        {isManager && (
          <ChangeButton variant="primary" onClick={margeGame}>
            📌&nbsp;포메이션&nbsp;적용
          </ChangeButton>
        )}
      </ButtonStack>
    </PRGameContainer>
  );
};

export default PRGame;

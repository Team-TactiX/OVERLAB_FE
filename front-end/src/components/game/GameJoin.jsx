import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ChangeButton = styled.button`
  background-color: #00b894; // 스포티한 민트 색상
  color: white;
  width: 100%;
  height: 5.5vh;
  font-size: 1.8vh;
  font-weight: 700;
  border-radius: 2vh; // 더 둥글게
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); // 살짝 그림자
  transition: all 0.2s ease;

  &:hover {
    background-color: white;
    color: #00b894;
    border: 1px solid #00b894;
    cursor: pointer;
  }

  &:disabled {
    background-color: #bbb;
    color: #666;
    cursor: not-allowed;
    border: none;
  }
`;


const GameJoin = ({ userMail, users, gameId, hasPermission, handleRemovePosition }) => {
  const isAlreadyJoined = users?.some((user) => user.userMail === userMail);

  const handleJoinGame = async () => {
    if (isAlreadyJoined) return alert('이미 참가 중입니다.');
    try {
      const res = await fetch(`http://52.78.12.127:8080/api/games/${gameId}/insert-to-game`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMail }),
      });
      if (res.ok) {
        alert('경기 참가가 완료되었습니다.');
        window.location.reload();
      } else {
        alert(await res.text());
      }
    } catch (err) {
      console.error(err);
      alert('서버 오류가 발생했습니다.');
    }
  };

  const handleLeaveGame = async () => {
    if (!isAlreadyJoined) return alert('참가 중이 아닙니다.');
    try {
      if (hasPermission) {
        await handleRemovePosition(); // 포지션 제거 먼저
      }
      const res = await fetch(`http://52.78.12.127:8080/api/games/${gameId}/remove-from-game`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMail }),
      });
      if (res.ok) {
        alert('경기 참가 취소가 완료되었습니다.');
        window.location.reload();
      } else {
        alert(await res.text());
      }
    } catch (err) {
      console.error(err);
      alert('경기 취소 중 서버 오류가 발생했습니다.');
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <ChangeButton onClick={handleJoinGame} style={{ width: '48%' }}>
          경기 참가
        </ChangeButton>
        <ChangeButton onClick={handleLeaveGame} style={{ width: '48%' }}>
          참가 취소
        </ChangeButton>
      </div>
      {!hasPermission && (
        <Link to={`/pr/list/${gameId}`} style={{ width: '100%', display: 'block', marginTop: '2vh' }}>
          <ChangeButton>포메이션 요청</ChangeButton>
        </Link>
      )}
    </div>
  );
};

export default GameJoin;

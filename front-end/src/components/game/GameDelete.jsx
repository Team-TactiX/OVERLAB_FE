import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

const GameDelete = ({ gameId, teamId, setUpdate }) => {
  const navigate = useNavigate();

  const handleDeleteGame = async () => {
    const confirmDelete = window.confirm('정말로 경기를 삭제할까요?');
    if (!confirmDelete) return;

    try {
      const res = await fetch('/api/games/delete-game', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId: Number(gameId) }),
      });

      if (res.ok) {
        alert('삭제 완료');
        navigate(`/team/${teamId}`);
      } else {
        const error = await res.text();
        alert('삭제 실패: ' + error);
      }
    } catch (err) {
      console.error(err);
      alert('서버 오류');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3vh' }}>
      <ChangeButton
        onClick={handleDeleteGame}
        style={{ width: '13vh', backgroundColor: '#c0392b' }}
      >
        경기 삭제
      </ChangeButton>
    </div>
  );
};

export default GameDelete;

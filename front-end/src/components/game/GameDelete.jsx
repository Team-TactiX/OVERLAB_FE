import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const RedButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5vh;
  width: 100%;
  height: 5.5vh;
  font-size: 1.8vh;
  font-weight: 600;
  border-radius: 3vh;
  color: #B71C1C;
  background-color: #FFCDD2;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: translateY(-0.3vh) scale(1.05);
    background-color: #EF9A9A;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const GameDelete = ({ gameId, teamId }) => {
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
    <RedButton onClick={handleDeleteGame}>
      <span className="text-[2vh]">🗑️</span>
      <span className="tracking-wide">경기 삭제</span>
    </RedButton>
  );
};

export default GameDelete;

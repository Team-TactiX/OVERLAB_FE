import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateGame from '../../components/game/CreateGame';

const CreateGamePage = () => {
  const [versus, setVersus] = useState('');
  const [gameName, setGameName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [oppoLogo, setOppoLogo] = useState(null);
  const navigate = useNavigate();
  const teamId = sessionStorage.getItem('teamId');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await CreateGame({ versus, gameName, startDate, oppoLogo, teamId });
      if (success) {
        alert('경기가 성공적으로 추가되었습니다.');
        navigate(`/team/${teamId}`);
      }
    } catch (err) {
      alert(`생성 실패: ${err.message}`);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto mt-24 p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-extrabold text-center mb-8"> 경기 추가</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-base font-bold mb-2">
            상대팀명 <span className="text-green-500 ml-[0.3vh]">⚽</span>
          </label>
          <input
            type="text"
            value={versus}
            onChange={(e) => setVersus(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-base font-bold mb-2">
            경기 이름 <span className="text-green-500 ml-[0.3vh]">⚽</span>
          </label>
          <input
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-base font-bold mb-2">
            날짜 <span className="text-green-500 ml-[0.3vh]">⚽</span>
          </label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
        <label className="block text-base font-bold mb-2">
          상대팀 로고 <span className="text-green-500 ml-[0.3vh]">⚽</span>
        </label>
        <p className="text-sm text-gray-500 italic mb-2">
          선택하지 않으면 기본 이미지가 적용됩니다.
        </p>

          <div className="w-full border border-gray-300 rounded-lg p-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setOppoLogo(e.target.files[0])}
              className="w-full text-base"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white text-base font-bold rounded-lg hover:bg-green-600 transition"
        >
          등록
        </button>
      </form>
    </div>
  );
};

export default CreateGamePage;

import { useEffect, useState } from 'react';

const FeedCreate = ({ userMail, onClose }) => {
  const [teamData, setTeamData] = useState([]);
  const [matchData, setMatchData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedMatch, setSelectedMatch] = useState('');
  const [teamId, setTeamId] = useState('');
  const [category, setCategory] = useState('매칭');
  const [startDate, setStartDate] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [gameId, setGameId] = useState('');

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const res = await fetch(
          `http://52.78.12.127:8080/api/teams/mail/${userMail}`,
        );
        const data = await res.json();
        const filtered = data.filter(
          (team) => team.teamManagerMail === userMail,
        );
        setTeamData(filtered);
        if (filtered.length > 0) {
          setSelectedTeam(filtered[0]);
          setTeamId(filtered[0].teamId);
          handleMatch(filtered[0].teamId);
        }
      } catch (err) {
        console.error('팀 정보 오류:', err);
      }
    };

    fetchTeamData();
  }, [userMail]);

  const handleMatch = async (teamId) => {
    try {
      const response = await fetch(
        `http://52.78.12.127:8080/api/games/team/${teamId}`,
      );
      if (response.ok) {
        const games = await response.json();
        setMatchData(games);
        const filtered = games.filter(
          (match) => match.team.teamManagerMail === userMail,
        );
        if (filtered.length > 0) {
          setSelectedMatch(filtered[0]);
          setGameId(filtered[0].gameId);
        }
      } else {
        throw new Error('게임을 찾을 수 없습니다.');
      }
    } catch (error) {
      alert(error.message);
      document.getElementById('gameList').innerHTML = '';
    }
  };

  const handleSubmit = async () => {
    if (!teamId || !title.trim() || !content.trim()) return alert('입력 누락');

    if ((category === '매칭' || category === '용병') && !startDate)
      return alert('날짜 필요');

    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 19);

    const body = {
      title,
      content,
      teamId: Number(teamId),
      gameId: category == '용병' || category == '매칭' ? Number(gameId) : null,
      userMail,
      category,
      matchDay:
        category === '매칭' || category === '용병' ? startDate : formattedDate,
    };

    try {
      const res = await fetch('http://52.78.12.127:8080/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        alert('등록 완료!');
        window.location.reload();
      } else {
        const errorText = await res.text();
        alert('등록 실패');
        console.error(errorText);
      }
    } catch (err) {
      alert('서버 오류 발생');
      console.error(err);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed top-0 min-h-screen left-0 w-full bg-black bg-opacity-50 flex justify-center p-4 items-center z-40"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white max-h-[calc(100vh-2rem)] overflow-y-auto rounded-lg px-8 py-4 w-full max-w-md box-border shadow-lg relative animate-fadeIn"
      >
        <div className="flex justify-center items-center mb-8 relative">
          <h3 className="text-xl font-bold m-0 break-keep">게시글 작성</h3>
          <button
            onClick={onClose}
            className="text-xl bg-none border-none cursor-pointer absolute right-0 top-0"
          >
            ✖
          </button>
        </div>

        {/* 팀 선택 */}
        <div className="mb-4">
          <div className="text-base font-semibold mb-2">
            팀 선택 <span className="text-green-500 ml-1">⚽</span>
          </div>
          <select
            value={selectedTeam?.teamName || ''}
            onChange={(e) => {
              const team = teamData.find((t) => t.teamName === e.target.value);
              setSelectedTeam(team);
              setTeamId(team.teamId);
              handleMatch(team.teamId);
            }}
            className="w-full text-base p-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-green-500 focus:bg-white box-border"
          >
            {teamData.map((team) => (
              <option key={team.teamId} value={team.teamName}>
                {team.teamName}
              </option>
            ))}
          </select>
        </div>

        {/* 매치 선택 */}
        {category === '용병' && (
          <div className="mb-4">
            <div className="text-base font-semibold mb-2">
              매치 선택 <span className="text-green-500 ml-1">⚽</span>
            </div>
            <select
              value={selectedMatch?.gameName || ''}
              onChange={(e) => {
                const match = matchData.find(
                  (m) => m.gameName === e.target.value,
                );
                setSelectedMatch(match);
                setGameId(match.gameId);
              }}
              className="w-full text-base p-2 border border-gray-300 rounded-lg bg-grayh-100 focus:outline-green-500 focus:bg-white box-border"
            >
              {matchData.map((match) => (
                <option key={match.gameId} value={match.gameName}>
                  {match.gameName}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 카테고리 선택 */}
        <div className="mb-4">
          <div className="text-base font-semibold mb-2">
            카테고리 선택 <span className="text-green-500 ml-1">⚽</span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setCategory('매칭')}
              className={`flex-1 text-base p-1 border ${
                category === '매칭'
                  ? 'border-green-500 bg-green-500 text-white'
                  : 'border-gray-300 bg-gray-100 text-gray-800'
              } rounded-lg cursor-pointer transition hover:border-green-500`}
            >
              매칭
            </button>
            <button
              onClick={() => setCategory('팀원 모집')}
              className={`flex-1 text-base p-1 border ${
                category === '팀원 모집'
                  ? 'border-green-500 bg-green-500 text-white'
                  : 'border-gray-300 bg-gray-100 text-gray-800'
              } rounded-lg cursor-pointer transition hover:border-green-500`}
            >
              팀원 모집
            </button>
            <button
              onClick={() => setCategory('용병')}
              className={`flex-1 text-base py-2 px-1 border ${
                category === '용병'
                  ? 'border-green-500 bg-green-500 text-white'
                  : 'border-gray-300 bg-gray-100 text-gray-800'
              } rounded-lg cursor-pointer transition hover:border-green-500`}
            >
              용병
            </button>
          </div>
        </div>

        {/* 날짜 선택 */}
        {(category === '매칭' || category === '용병') && (
          <div className="mb-4">
            <div className="text-base font-semibold mb-2">
              경기 날짜 <span className="text-green-500 ml-1">⚽</span>
            </div>
            <input
              type="datetime-local"
              placeholder="날짜 선택"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full text-base p-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-green-500 focus:bg-white box-border"
            />
          </div>
        )}

        {/* 제목 */}
        <div className="mb-4">
          <div className="text-base font-semibold mb-2">
            제목 <span className="text-green-500 ml-1">⚽</span>
          </div>
          <input
            type="text"
            placeholder="제목 입력"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-base p-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-green-500 focus:bg-white box-border"
          />
        </div>

        {/* 내용 */}
        <div className="mb-4">
          <div className="text-base font-semibold mb-2">
            내용 <span className="text-green-500 ml-1">⚽</span>
          </div>
          <textarea
            placeholder="내용 입력"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full text-base p-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-green-500 focus:bg-white box-border resize-none h-40"
          />
        </div>

        {/* 등록 버튼 */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white text-lg p-3 rounded-lg border-none cursor-pointer mt-4 shadow-md transition hover:bg-green-600 box-border"
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default FeedCreate;

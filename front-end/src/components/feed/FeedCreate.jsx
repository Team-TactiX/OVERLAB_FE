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
  const userId = sessionStorage.getItem('userId');

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
        if (games.length > 0) {
          setSelectedMatch(games[0]);
          setGameId(games[0].gameId);
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

    if (category === '매칭' && !startDate) return alert('날짜 필요');

    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 19);

    const body = {
      title,
      content,
      teamId: Number(teamId),
      gameId: category == '용병' ? Number(gameId) : null,
      userMail,
      category,
      matchDay: category === '매칭' ? startDate : formattedDate,
      userId,
    };

    console.log(body);

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
      className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-[9999]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[2vh] p-[4vh_3vh] w-[90%] max-w-[360px] box-border shadow-lg relative animate-fadeIn"
      >
        <div className="flex justify-center items-center mb-[4vh] relative">
          <h3 className="text-[2.4vh] font-bold m-0 break-keep">게시글 작성</h3>
          <button
            onClick={onClose}
            className="text-[2.4vh] bg-none border-none cursor-pointer absolute right-0 top-0"
          >
            ✖
          </button>
        </div>

        {/* 팀 선택 */}
        <div className="mb-[3vh]">
          <div className="text-[1.7vh] font-semibold mb-[1vh]">
            팀 선택 <span className="text-green-500 ml-[0.3vh]">⚽</span>
          </div>
          <select
            value={selectedTeam?.teamName || ''}
            onChange={(e) => {
              const team = teamData.find((t) => t.teamName === e.target.value);
              setSelectedTeam(team);
              setTeamId(team.teamId);
              handleMatch(team.teamId);
            }}
            className="w-full text-[1.7vh] p-[1.5vh] border border-gray-300 rounded-[1vh] bg-[#f9f9f9] focus:outline-green-500 focus:bg-white box-border"
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
          <div className="mb-[3vh]">
            <div className="text-[1.7vh] font-semibold mb-[1vh]">
              매치 선택 <span className="text-green-500 ml-[0.3vh]">⚽</span>
            </div>
            <select
              value={selectedMatch?.gameName || ''}
              onChange={(e) => {
                const match = matchData.find(
                  (m) => m.versus === e.target.value,
                );
                setSelectedMatch(match);
                setGameId(match.gameId);
              }}
              className="w-full text-[1.7vh] p-[1.5vh] border border-gray-300 rounded-[1vh] bg-[#f9f9f9] focus:outline-green-500 focus:bg-white box-border"
            >
              {matchData.map((match) => (
                <option key={match.gameId} value={match.gameName}>
                  {match.versus}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 카테고리 선택 */}
        <div className="mb-[3vh]">
          <div className="text-[1.7vh] font-semibold mb-[1vh]">
            카테고리 선택 <span className="text-green-500 ml-[0.3vh]">⚽</span>
          </div>
          <div className="flex gap-[2vh]">
            <button
              onClick={() => setCategory('매칭')}
              className={`flex-1 text-[1.7vh] p-[1.5vh_0] border ${
                category === '매칭'
                  ? 'border-green-500 bg-green-500 text-white'
                  : 'border-gray-300 bg-[#f9f9f9] text-gray-800'
              } rounded-[1vh] cursor-pointer transition hover:border-green-500`}
            >
              매칭
            </button>
            <button
              onClick={() => setCategory('팀원 모집')}
              className={`flex-1 text-[1.7vh] p-[1.5vh_0] border ${
                category === '팀원 모집'
                  ? 'border-green-500 bg-green-500 text-white'
                  : 'border-gray-300 bg-[#f9f9f9] text-gray-800'
              } rounded-[1vh] cursor-pointer transition hover:border-green-500`}
            >
              팀원 모집
            </button>
            <button
              onClick={() => setCategory('용병')}
              className={`flex-1 text-[1.7vh] p-[1.5vh_0] border ${
                category === '용병'
                  ? 'border-green-500 bg-green-500 text-white'
                  : 'border-gray-300 bg-[#f9f9f9] text-gray-800'
              } rounded-[1vh] cursor-pointer transition hover:border-green-500`}
            >
              용병
            </button>
          </div>
        </div>

        {/* 날짜 선택 */}
        {category === '매칭' && (
          <div className="mb-[3vh]">
            <div className="text-[1.7vh] font-semibold mb-[1vh]">
              경기 날짜 <span className="text-green-500 ml-[0.3vh]">⚽</span>
            </div>
            <input
              type="datetime-local"
              placeholder="날짜 선택"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full text-[1.7vh] p-[1.5vh] border border-gray-300 rounded-[1vh] bg-[#f9f9f9] focus:outline-green-500 focus:bg-white box-border"
            />
          </div>
        )}

        {/* 제목 */}
        <div className="mb-[3vh]">
          <div className="text-[1.7vh] font-semibold mb-[1vh]">
            제목 <span className="text-green-500 ml-[0.3vh]">⚽</span>
          </div>
          <input
            type="text"
            placeholder="제목 입력"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-[1.7vh] p-[1.5vh] border border-gray-300 rounded-[1vh] bg-[#f9f9f9] focus:outline-green-500 focus:bg-white box-border"
          />
        </div>

        {/* 내용 */}
        <div className="mb-[3vh]">
          <div className="text-[1.7vh] font-semibold mb-[1vh]">
            내용 <span className="text-green-500 ml-[0.3vh]">⚽</span>
          </div>
          <textarea
            placeholder="내용 입력"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full text-[1.7vh] p-[1.5vh] border border-gray-300 rounded-[1vh] bg-[#f9f9f9] focus:outline-green-500 focus:bg-white box-border resize-none h-[10vh]"
          />
        </div>

        {/* 등록 버튼 */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white text-[2vh] p-[1.8vh] rounded-[2vh] border-none cursor-pointer mt-[2vh] shadow-md transition hover:bg-green-600 box-border"
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default FeedCreate;

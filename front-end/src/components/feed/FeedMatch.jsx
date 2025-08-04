import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeedMatch = ({ post, userMail, onClose }) => {
  const [myTeams, setMyTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [team, setTeam] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      const res = await fetch(
        `http://52.78.12.127:8080/api/teams/mail/${userMail}`,
      );
      const data = await res.json();
      const filtered = data.filter(
        (t) => t.teamManagerMail === userMail && t.teamId !== post.teamId,
      );
      setMyTeams(filtered);
      if (filtered.length > 0) setSelectedTeamId(filtered[0].teamId);
      const teamResponse = await fetch(
        `http://52.78.12.127:8080/api/teams/${post.teamId}`,
      );
      const teamData = await teamResponse.json();
      setTeam(teamData);
    };

    fetchTeams();
  }, [userMail, post]);

  const handleMatch = async () => {
    const requesterTeam = myTeams.find(
      (t) => t.teamId === Number(selectedTeamId),
    );
    const startDate = new Date(post.matchDay).toISOString().replace('Z', '');
    const fetchLogo = async () => {
      const res = await fetch('/img/alt_image.png');
      const blob = await res.blob();
      return new File([blob], 'default-logo.png', { type: blob.type });
    };

    const games = [
      {
        teamId: requesterTeam.teamId,
        versus: team.teamName,
        gameName: `${post.matchDay.slice(0, 10)} ${team.teamName} 매칭 신청`,
      },
      {
        teamId: post.teamId,
        versus: requesterTeam.teamName,
        gameName: `${post.matchDay.slice(0, 10)} ${
          requesterTeam.teamName
        } 매칭 신청`,
      },
    ];

    for (const game of games) {
      const logoFile = await fetchLogo();
      const formData = new FormData();
      formData.append('teamId', String(game.teamId));
      formData.append('versus', game.versus);
      formData.append('gameName', game.gameName);
      formData.append('startDate', startDate);
      formData.append('oppoLogo', logoFile);

      const res = await fetch(
        'http://52.78.12.127:8080/api/games/create-game',
        {
          method: 'POST',
          body: formData,
        },
      );

      if (!res.ok) {
        const errText = await res.text();
        alert(`매치 실패 : ${errText}`);
        return;
      }
    }

    const res = await fetch(
      `http://52.78.12.127:8080/api/community/${post.contentId}`,
      { method: 'DELETE' },
    );
    if (!res.ok) return alert('매칭 후 삭제 실패');
    alert('매칭 성공!');
    onClose();
    navigate(`/team/${requesterTeam.teamId}`);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[2vh] p-[4vh_3vh] w-[90%] max-w-[360px] box-border shadow-lg"
      >
        <h3 className="text-[2.4vh] font-bold mb-[2vh]">매칭 신청</h3>
        {myTeams.length > 0 ? (
          <>
            <select
              value={selectedTeamId}
              onChange={(e) => setSelectedTeamId(e.target.value)}
              className="w-full mb-[2vh] p-[1.5vh] border border-gray-300 rounded-[1vh] text-[1.7vh] bg-[#f9f9f9] focus:outline-green-500 focus:bg-white box-border"
            >
              {myTeams.map((t) => (
                <option key={t.teamId} value={t.teamId}>
                  {t.teamName}
                </option>
              ))}
            </select>

            <div className="flex justify-between gap-[1.5vh]">
              <button
                onClick={onClose}
                className="flex-1 border border-gray-400 text-gray-600 py-[1.2vh] rounded-[1vh] hover:bg-gray-100 active:scale-95 transition"
              >
                취소
              </button>
              <button
                onClick={handleMatch}
                className="flex-1 border border-green-500 text-green-500 py-[1.2vh] rounded-[1vh] hover:bg-green-50 active:scale-95 transition"
              >
                신청
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-center text-[1.7vh] mb-[2vh]">
              신청 가능한 팀이 없습니다.
            </p>
            <button
              onClick={onClose}
              className="w-full border border-gray-400 text-gray-600 py-[1.2vh] rounded-[1vh] hover:bg-gray-100 active:scale-95 transition"
            >
              취소
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedMatch;

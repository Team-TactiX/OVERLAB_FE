import { useEffect, useState } from 'react';
const baseURL = import.meta.env.VITE_API_BASE_URL;

const usePost = ({ contentId }) => {
  const [post, setPost] = useState(null);
  const [game, setGame] = useState('');
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const handleError = (err) => {
      console.error('오류:', err);
      alert('서버와의 통신 중 오류가 발생했습니다.');
    };

    const fetchData = async () => {
      try {
        // 1. 게시물 데이터 가져오기
        const postResponse = await fetch(
          `${baseURL}/api/community/${contentId}`,
        );
        if (!postResponse.ok) throw new Error(await postResponse.text());
        const postData = await postResponse.json();
        setPost(postData);

        // 2. 경기 날짜 가져오기
        if (postData.gameId) {
          const gameResponse = await fetch(
            `${baseURL}/api/games/game/${postData.gameId}`,
          );
          if (!gameResponse.ok) throw new Error(await gameResponse.text());
          const gameData = await gameResponse.json();
          setGame(gameData);
        }

        // 3. 팀 정보 가져오기
        if (postData.teamId) {
          const teamResponse = await fetch(
            `${baseURL}/api/teams/${postData.teamId}`,
          );
          if (!teamResponse.ok) throw new Error(await teamResponse.text());
          const teamData = await teamResponse.json();
          setTeam(teamData);
        }
      } catch (err) {
        handleError(err);
      }
    };

    fetchData();
  }, [contentId]);

  return { post, game, team };
};

export default usePost;

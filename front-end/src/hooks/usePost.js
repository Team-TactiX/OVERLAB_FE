import { useEffect, useState } from 'react';

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
          `http://52.78.12.127:8080/api/community/${contentId}`,
        );
        if (!postResponse.ok) throw new Error(await postResponse.text());
        const postData = await postResponse.json();
        setPost(postData);

        // 2. 경기 날짜 가져오기
        if (postData.gameId) {
          const gameResponse = await fetch(
            `http://52.78.12.127:8080/api/games/game/${postData.gameId}`,
          );
          if (!gameResponse.ok) throw new Error(await gameResponse.text());
          const gameData = await gameResponse.json();
          setGame(gameData);
        }

        // 3. 팀 정보 가져오기
        if (postData.teamId) {
          const teamResponse = await fetch(
            `http://52.78.12.127:8080/api/teams/${postData.teamId}`,
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

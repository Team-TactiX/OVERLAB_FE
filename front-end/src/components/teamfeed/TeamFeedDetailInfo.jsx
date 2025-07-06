import { useEffect, useState } from 'react';
import TeamFeedUpdate from './TeamFeedUpdate';
import TeamFeedDelete from './TeamFeedDelete';
import styled from 'styled-components';

const StyledVideo = styled.video`
  width: 40vh;
  height: 40vh;
  object-fit: cover;
  border-radius: 0.4vh;
`;

const TeamFeedDetailInfo = ({ teamFeedId }) => {
  const [update, setUpdate] = useState(false);
  const [teamFeed, setTeamFeed] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const teamRes = await fetch(`http://52.78.12.127:8080/api/files/file/${teamFeedId}`);
      const teamData = await teamRes.json();
      setTeamFeed(teamData);
    };
    fetchData();

  }, [teamFeedId]);

  if (!teamFeed) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">{teamFeed.title}</h2>
      {teamFeed.fileType.startsWith('image/') ? (
        <img src={`http://52.78.12.127:8080/media/${teamFeed.realFileName}`} alt={teamFeed.fileType} className="w-40 h-40 object-cover rounded" />
        ) : teamFeed.fileType.startsWith('video/') ? (
          <StyledVideo src={`http://52.78.12.127:8080/media/${teamFeed.realFileName}`} controls />
        ) : (
          <span>지원되지 않는 파일</span>
        )}
      <p>{teamFeed.content}</p>
      <button onClick={() => setUpdate(true)}>수정</button>
      <TeamFeedDelete />
      {update && <TeamFeedUpdate setUpdate={setUpdate} />}
    </div>
  );
};

export default TeamFeedDetailInfo;

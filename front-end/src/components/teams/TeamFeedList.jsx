import { Link, useParams } from 'react-router-dom';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledImg = styled.img`
  width: 10vh;
  height: 10vh;
  object-fit: cover;
  border-radius: 0.4vh;
`;

const StyledVideo = styled.video`
  width: 10vh;
  height: 10vh;
  object-fit: cover;
  border-radius: 0.4vh;
`;

const TeamFeedList = () => {
  const { teamId } = useParams();
  const [teamFeedList, setTeamFeedList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://52.78.12.127:8080/api/files/team/${teamId}`,
      );
      const data = await res.json();
      setTeamFeedList(data);
    };
    fetchData();
  }, [teamId]);

  if (!teamFeedList) return <>로딩중</>;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-base font-semibold">📝 팀 게시글</h2>
        <Link to={`/teamfeed/list/${teamId}`} className="text-sm text-blue-500">
          전체보기
        </Link>
      </div>

      <ScrollContainer
        className="flex gap-3 overflow-x-auto pb-1 cursor-grab active:cursor-grabbing scrollbar-hide"
        horizontal
      >
        {teamFeedList.map((teamFeed) => (
          <Link
            key={teamFeed.fileId}
            to={`/teamfeed/${teamFeed.fileId}`}
            className="flex-shrink-0 w-[10vh] min-w-[10vh] bg-white border border-gray-300 p-[0.6vh] no-underline text-black flex flex-col items-center hover:border-blue-500 transition rounded-lg"
          >
            <div className="w-[7vh] h-[7vh] rounded-lg overflow-hidden mb-[0.5vh]">
              {teamFeed.fileType.startsWith('image/') ? (
                <StyledImg
                  src={`http://52.78.12.127:8080/media/${teamFeed.realFileName}`}
                  alt={teamFeed.fileType}
                />
              ) : teamFeed.fileType.startsWith('video/') ? (
                <StyledVideo
                  src={`http://52.78.12.127:8080/media/${teamFeed.realFileName}`}
                  controls
                />
              ) : (
                <span>지원되지 않는 파일</span>
              )}
            </div>
            <div className="text-[1.4vh] text-center truncate max-w-[9vh]">
              {teamFeed.title}
            </div>
          </Link>
        ))}
      </ScrollContainer>
    </div>
  );
};

export default TeamFeedList;

import altImage from '../../img/alt_image.png';
import { Link, useParams } from 'react-router-dom';
import ScrollContainer from 'react-indiana-drag-scroll';

const teamFeedList = [
  { id: 1, title: '첫 번째 게시글', img: altImage },
  { id: 2, title: '두 번째 게시글', img: altImage },
  { id: 3, title: '세 번째 게시글', img: altImage },
  { id: 4, title: '네 번째 게시글', img: altImage },
];

const TeamFeedList = () => {
  const { teamId } = useParams();

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
        {teamFeedList.map((feed) => (
          <Link
            key={feed.id}
            to={`/teamfeed/${feed.id}`}
            className="flex-shrink-0 w-[10vh] min-w-[10vh] bg-white border border-gray-300 p-[0.6vh] no-underline text-black flex flex-col items-center hover:border-blue-500 transition rounded-lg"
          >
            <div className="w-[7vh] h-[7vh] rounded-lg overflow-hidden mb-[0.5vh]">
              <img src={feed.img} alt={feed.title} className="w-full h-full object-cover" />
            </div>
            <div className="text-[1.4vh] text-center truncate max-w-[9vh]">{feed.title}</div>
          </Link>
        ))}
      </ScrollContainer>
    </div>
  );
};

export default TeamFeedList;

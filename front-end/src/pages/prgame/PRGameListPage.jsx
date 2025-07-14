import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PRGameList from '../../components/prgame/PRGameList';
import { GiSoccerField } from 'react-icons/gi';            // ← 여기!

const PRGamesListPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 8vh;
`;

const PRGameListPage = () => {
  const { gameId } = useParams();

  return (
    <PRGamesListPageContainer>
      <PRGameList />

      {/* ───────── “포메이션 생성” Glass 버튼 ───────── */}
      <Link
        to={`/pr/create/${gameId}`}
        className="
          relative mx-auto mt-[4vh] w-[78%] max-w-[500px]
          flex items-center justify-center
          h-[6.4vh] sm:h-[6.4vh] md:h-[7vh]
          rounded-[3vh] bg-white/10 backdrop-blur-md
          border border-transparent
          font-bold text-emerald-600 text-[2vh]
          shadow-[0_4px_8px_rgba(0,0,0,0.05)]
          transition-all duration-200
          group
          active:translate-y-[2px] active:shadow-sm
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500
        "
      >
        {/* 흐림 레이어 */}
        <span
          className="
            before:absolute before:inset-0 before:rounded-[3vh]
            before:bg-white/20 before:backdrop-blur-xl before:-z-10
          "
        />

        {/* hover 그라데이션 */}
        <span
          className="
            absolute inset-0 rounded-[3vh]
            bg-gradient-to-r from-emerald-400 to-emerald-500
            opacity-0 group-hover:opacity-100
            transition-opacity duration-200
          "
        />

        {/* 아이콘 + 텍스트 */}
        <span className="relative z-[1] flex items-center gap-[0.6vh]">
          <GiSoccerField className="text-[1.2em]" />
          <span className="group-hover:text-white transition-colors duration-150">
            포메이션&nbsp;생성
          </span>
        </span>
      </Link>
    </PRGamesListPageContainer>
  );
};

export default PRGameListPage;

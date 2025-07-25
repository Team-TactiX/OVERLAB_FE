import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import TeamFeedDetailInfo from "../../components/teamfeed/TeamFeedDetailInfo";

// 전체 페이지 래퍼
const Container = styled.div`
  margin-top: 9vh;
  background-color: #fafafa;
  min-height: 100vh;
`;

// 상단 헤더
const HeaderBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: #e8f5e9; // 연초록
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid #d0e0d0;
`;

// 왼쪽 ← 버튼
const BackButton = styled.button`
  position: absolute;
  left: 16px;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #388e3c;
  cursor: pointer;
  font-weight: 600;
`;

// 중앙 제목
const Title = styled.h1`
  font-size: 1.05rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const Section = styled.section`
  padding: rem 0.5rem;
`;

const Separator = styled.div`
  height: 8px;
  background-color: #f5f5f5;
  margin: 2rem 0;
  border-radius: 1px;
`;

const TeamFeedDetailPage = () => {
  const { teamFeedId } = useParams();
  const navigate = useNavigate();

  return (
    <Container>
      <HeaderBar>
        <BackButton onClick={() => navigate(-1)}>←</BackButton>
        <Title>게시글 보기</Title>
      </HeaderBar>

      <Section>
        <TeamFeedDetailInfo teamFeedId={teamFeedId} />
      </Section>

      <Separator />
    </Container>
  );
};

export default TeamFeedDetailPage;

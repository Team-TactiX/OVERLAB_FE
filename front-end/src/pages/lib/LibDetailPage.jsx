import { useParams, useNavigate } from 'react-router-dom';
import formations from '../../data/formation.json';
import tactics from '../../data/tactic.json';
import styled from 'styled-components';
import backImg from '../../img/back.png';

const Container = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  display: flex;
  justify-content: center;
  padding: 5vh 2vh;
`;

const Card = styled.div`
  width: 100%;
  max-width: 720px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  position: relative;
`;

const BackButton = styled.img`
  position: absolute;
  top: 24px;
  left: 24px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  opacity: 0.7;
  transition: 0.2s;

  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 12px;
  color: #1f2937;
`;

const Summary = styled.p`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  color: #4b5563;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-top: 32px;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #374151;
  line-height: 1.7;
`;

const MediaBox = styled.div`
  margin: 24px 0;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f1f5f9;
`;

const LibDetailPage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const data =
    type === 'formation'
      ? formations.find((f) => String(f.id) === id)
      : tactics.find((t) => String(t.id) === id);

  if (!data) {
    return (
      <Container>
        <Card>
          <Description>
            {type === 'formation'
              ? '포메이션 정보를 찾을 수 없습니다.'
              : '전술 정보를 찾을 수 없습니다.'}
          </Description>
        </Card>
      </Container>
    );
  }

  const renderMedia = () => {
    if (!data.img) {
      return (
        <MediaBox style={{ padding: '48px 0', textAlign: 'center', color: '#94a3b8' }}>
          📭 미디어가 없습니다.
        </MediaBox>
      );
    }
    if (data.img.endsWith('.mp4')) {
      return (
        <MediaBox>
          <video src={data.img} controls style={{ width: '100%', display: 'block' }} />
        </MediaBox>
      );
    }
    if (data.img.match(/\.(jpg|jpeg|png|gif)$/)) {
      return (
        <MediaBox>
          <img src={data.img} alt={data.title} style={{ width: '100%', display: 'block' }} />
        </MediaBox>
      );
    }
    if (data.img.endsWith('.html')) {
      return (
        <MediaBox>
          <iframe
            src={data.img}
            title={data.title}
            style={{ width: '100%', minHeight: '30vh', border: 'none' }}
          />
        </MediaBox>
      );
    }
    return null;
  };

  return (
    <Container>
      <Card>
        <BackButton src={backImg} alt="◀" onClick={() => navigate(-1)} />
        <Title>{data.title}</Title>
        <Summary>{data.summation}</Summary>

        <SectionTitle>상세 설명</SectionTitle>
        <Description>{data.description1}</Description>

        {renderMedia()}

        <SectionTitle>비고</SectionTitle>
        <Description>{data.description2}</Description>
      </Card>
    </Container>
  );
};

export default LibDetailPage;

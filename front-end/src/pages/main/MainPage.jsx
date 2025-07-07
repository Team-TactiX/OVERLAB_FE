import FormationCarousel from '../../components/main/FormationCarousel';
import MyTeamSection from '../../components/main/MyTeamSection';
import ScheduleSection from '../../components/main/ScheduleSection';
import styled from 'styled-components';

const PageWrapper = styled.div`
  padding-top: 8vh;
  padding-bottom: 2vh;
  background-color: #ffffff;
  min-height: 120vh;
`;

const SectionWrapper = styled.div`
  padding: 1vh 1.7vw;

  @media (max-width: 768px) {
    padding: 1.5vh 3vw;
  }

  @media (max-width: 480px) {
    padding: 1vh 4vw;
  }
`;

const Divider = styled.div`
  height: 0.7vh;
  background-color: #f2f2f2;
  margin: 1vh 0;
  border-radius: 1vh;
`;

const MainPage = () => {
  return (
    <PageWrapper>
      <SectionWrapper>
        <FormationCarousel />
      </SectionWrapper>

      <Divider />

      <SectionWrapper>
        <MyTeamSection />
      </SectionWrapper>

      <Divider />

      <SectionWrapper>
        <ScheduleSection />
      </SectionWrapper>
    </PageWrapper>
  );
};

export default MainPage;

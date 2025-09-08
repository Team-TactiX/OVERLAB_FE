import FormationCarousel from '../../components/main/FormationCarousel';
import MyTeamSection from '../../components/main/MyTeamSection';
import ScheduleSection from '../../components/main/ScheduleSection';

const MainPage = () => {
  return (
    // PageWrapper 스타일 적용
    <div className="mb-20 bg-white min-h-[120vh]">
      {/* SectionWrapper 스타일 적용 */}
      <div className="p-[1vh] px-[1.7vw] md:px-[3vw] sm:px-[4vw] md:py-[1.5vh]">
        <FormationCarousel />
      </div>

      {/* Divider 스타일 적용 */}
      <div className="h-[0.7vh] bg-[#f2f2f2] my-[1vh] rounded-[1vh]" />

      {/* SectionWrapper 스타일 적용 */}
      <div className="p-[1vh] px-[1.7vw] md:px-[3vw] sm:px-[4vw] md:py-[1.5vh]">
        <MyTeamSection />
      </div>

      {/* Divider 스타일 적용 */}
      <div className="h-[0.7vh] bg-[#f2f2f2] my-[1vh] rounded-[1vh]" />

      {/* SectionWrapper 스타일 적용 */}
      <div className="p-[1vh] px-[1.7vw] md:px-[3vw] sm:px-[4vw] md:py-[1.5vh]">
        <ScheduleSection />
      </div>
    </div>
  );
};

export default MainPage;

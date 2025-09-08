import Calender from '../../components/schedule/Calender';

const CalenderPage = () => {
  return (
    // Container 스타일 적용
    <div className="p-[8vh] px-[2vh] pb-[3vh] bg-gray-50">
      {/* Title 스타일 적용 */}
      <h2 className="inline-block text-[2.4vh] font-semibold mb-[2vh] border-b-2 border-gray-300">
        전체 일정
      </h2>
      <Calender />
    </div>
  );
};

export default CalenderPage;

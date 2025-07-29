import Calender from '../../components/schedule/Calender';

const CalenderPage = () => {
  return (
    <div className="pt-[10vh] px-6 md:px-10 pb-[3vh] bg-gray-50 min-h-screen">
      <h2 className="text-[2.4vh] font-semibold mb-[2vh] border-b-2 border-gray-300 inline-block">
        전체 일정
      </h2>
      <Calender />
    </div>
  );
};

export default CalenderPage;

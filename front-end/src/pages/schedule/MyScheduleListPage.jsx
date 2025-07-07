import { useState } from 'react';
import MyScheduleList from '../../components/schedule/MyScheduleList';

const MyScheduleListPage = () => {
  const [filter, setFilter] = useState('전체');

  return (
    <div className="w-full max-w-[768px] mx-auto min-h-[calc(100vh-12vh)] bg-[#f9f9f9] p-[8vh_2vw_6vh]">
      <h1 className="text-[2.4vh] font-bold text-center mb-[2vh]">경기 일정</h1>

      {/* 카테고리 탭 (업그레이드) */}
      <div className="flex justify-center gap-[1.5vh] mb-[3vh]">
        {['전체', '예정', '진행중', '완료'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-[2vh] py-[1vh] rounded-full text-[1.6vh] font-semibold transition border 
            ${
              filter === cat
                ? 'bg-green-500 text-white border-green-500 shadow'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <MyScheduleList filter={filter} />
    </div>
  );
};

export default MyScheduleListPage;

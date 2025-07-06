import { useState, useEffect } from 'react';
import TeamCreateModal from '../../components/teams/TeamCreateModal';
import TeamSearch from '../../components/teams/TeamSearch';
import TeamList from '../../components/teams/TeamList';

const TeamListPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleRefresh = () => setRefreshFlag((prev) => !prev);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    handleRefresh();
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col items-center pt-[4vh] px-4">
      <img src="/logo.png" alt="OVERLAB" className="h-[4vh] mb-[2vh]" />

      <div className="text-center mb-[4vh]">
        <h1 className="text-[3.2vh] font-bold">Team List</h1>
        <p className="text-[1.6vh] text-gray-500 mt-[0.7vh]">모든 팀을 조회할 수 있어요</p>
      </div>

      <div className="w-full max-w-[500px] mb-[3vh]">
        <TeamSearch onSearch={handleSearch} />
      </div>

      <div className="flex-1 w-full max-w-[500px] overflow-y-auto pb-[15vh]">
        <TeamList key={refreshFlag} refreshFlag={refreshFlag} keyword={searchKeyword} />
      </div>

      {/* 팀 생성 버튼 */}
      <div className="fixed bottom-[10vh] right-[calc(clamp(1vh,(100vw-50vh)/2+1vh,100vw))] z-[1000] group">
        <button
          onClick={() => setShowModal(true)}
          className="w-[6.5vh] h-[6.5vh] border-2 border-green-500 text-green-500 bg-white rounded-full cursor-pointer shadow-lg flex items-center justify-center hover:bg-green-50 active:scale-95 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-[3vh] h-[3vh]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>

      {showModal && (
        <TeamCreateModal
          onClose={() => setShowModal(false)}
          onSuccess={handleRefresh}
        />
      )}
    </div>
  );
};

export default TeamListPage;

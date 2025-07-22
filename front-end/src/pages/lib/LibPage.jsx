import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import formations from '../../data/formation.json';
import tactics from '../../data/tactic.json';
import ExpertFeedCreate from '../../components/lib/ExpertFeedCreate';

const TAB_LIST = [
  { key: 'feedback', label: 'Feedback.' },
  { key: 'lib', label: 'Lib.' },
];

const Lib_LIST = [
  { key: 'formation', label: 'Formation Lib.' },
  { key: 'tactics', label: 'Tactics Lib.' },
];

const LibPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'feedback';
  const initialLib = searchParams.get('lib') || 'formation';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeLib, setActiveLib] = useState(initialLib);
  const [isLib, setIsLib] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleTabChange = (key) => {
    setActiveTab(key);
    setSearchParams({ tab: key, lib: activeLib });
  };

  const handleLibChange = (key) => {
    setActiveLib(key);
    setSearchParams({ tab: activeTab, lib: key });
  };

  useEffect(() => {
    const tab = searchParams.get('tab') || 'feedback';
    setActiveTab(tab);
  }, [searchParams]);

  useEffect(() => {
    const lib = searchParams.get('lib') || 'formation';
    setActiveLib(lib);
  }, [searchParams]);

  useEffect(() => {
    setIsLib(activeTab === 'lib');
  }, [activeTab]);

  return (
    <div className="pt-[10vh] px-6 md:px-10 pb-[3vh] bg-gray-50 min-h-screen">
      {/* 최상위 탭 */}
      <div className="flex justify-center gap-12 mb-10 overflow-x-auto no-scrollbar border-b border-gray-200">
        {TAB_LIST.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`min-w-[6rem] text-center whitespace-nowrap text-xl font-extrabold focus:outline-none
              ${
                activeTab === tab.key
                  ? 'text-green-700 border-b-4 border-green-600 pb-2'
                  : 'text-gray-400 hover:text-green-600'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 하위 탭 (Lib 선택 시) */}
      {isLib && (
        <div className="flex justify-center gap-8 mb-8 overflow-x-auto no-scrollbar">
          {Lib_LIST.map((lib) => (
            <button
              key={lib.key}
              onClick={() => handleLibChange(lib.key)}
              className={`min-w-[5rem] text-center whitespace-nowrap text-base font-medium focus:outline-none
                ${
                  activeLib === lib.key
                    ? 'text-green-600 border-b-2 border-green-500 pb-1'
                    : 'text-gray-400 hover:text-green-500'
                }`}
            >
              {lib.label}
            </button>
          ))}
        </div>
      )}

      {/* 탭 내용 */}
      <div className="max-w-4xl mx-auto">
        {isLib && activeLib === 'formation' && (
          <>
            {formations.map((form) => (
              <div
                key={form.id}
                onClick={() => navigate(`/lib/detail/formation/${form.id}`)}
                className="bg-white rounded-xl p-6 mb-6 shadow cursor-pointer hover:scale-[1.02] transition-transform"
              >
                <p className="text-gray-600 text-sm mb-2">{form.summation}</p>
                <h3 className="text-lg font-bold mb-3">{form.title}</h3>
                <img
                  src={form.img}
                  alt={form.title}
                  className="w-full rounded-lg object-cover"
                />
              </div>
            ))}
          </>
        )}

        {isLib && activeLib === 'tactics' && (
          <>
            {tactics.map((tactic) => (
              <div
                key={tactic.id}
                onClick={() => navigate(`/lib/detail/tactic/${tactic.id}`)}
                className="bg-white rounded-xl p-6 mb-6 shadow cursor-pointer hover:scale-[1.02] transition-transform"
              >
                <h3 className="text-lg font-bold mb-2">{tactic.title}</h3>
                <p className="text-gray-600 text-sm">{tactic.summation}</p>
              </div>
            ))}
          </>
        )}
      </div>

      {/* 게시글 작성 버튼 */}
      <div className="fixed bottom-[10vh] right-4 z-50 group">
        <button
          onClick={() => setShowModal(true)}
          className="w-16 h-16 rounded-full bg-white border-2 border-green-500
          text-green-500 shadow-lg flex items-center justify-center
          transition-transform duration-150
          group-hover:scale-110 group-hover:shadow-xl active:scale-95"
          aria-label="게시글 작성"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 3.487a2.32 2.32 0 113.281 3.281L7.5 19.41l-4.245 1.06 1.06-4.244L16.862 3.487z"
            />
          </svg>
        </button>

        {/* 툴팁 */}
        <div
          className="absolute right-full top-1/2 -translate-y-1/2
            bg-gray-700 text-white text-sm px-3 py-1.5
            rounded shadow whitespace-nowrap
            opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          게시글 작성
          <div
            className="absolute top-1/2 left-full -translate-y-1/2
              w-0 h-0 border-t-[8px] border-t-transparent
              border-b-[8px] border-b-transparent
              border-l-[8px] border-l-gray-700"
          />
        </div>
      </div>

      {/* 모달 */}
      {showModal && !isLib && <ExpertFeedCreate setShowModal={setShowModal} />}
    </div>
  );
};

export default LibPage;

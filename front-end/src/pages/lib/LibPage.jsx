import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import formations from '../../data/formation.json';
import tactics from '../../data/tactic.json';
import ExpertFeedCreate from '../../components/lib/ExpertFeedCreate';

const PageWrapper = styled.div`
  padding: 7vh 2vw 3vh;
  background-color: #f9f9f9;
`;

const LibCard = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 2vh;
  margin-bottom: 3vh;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: scale(1.01);
  }
`;

const LibText = styled.p`
  font-size: 1.5vh;
  color: #555;
  margin: 0 0 0.5vh;
`;

const LibTitle = styled.h3`
  font-size: 1.8vh;
  font-weight: bold;
  margin: 0 0 1vh;
`;

const LibImage = styled.img`
  width: 100%;
  border-radius: 1vh;
  object-fit: cover;
`;

const TAB_LIST = [
  { key: 'feedback', label: 'Feedback.' },
  { key: 'lib', label: 'Lib.' },
];

const Lib_LIST = [
  { key: 'formation', label: 'Formation Lib.' },
  { key: 'tactics', label: 'Tactics Lib.' },
];

const TabBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  margin: 2vh 0 3vh 0;
  padding: 2vh 0;
  font-size: 2.5vh;
  font-weight: bold;
  gap: 4vh;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const TabItem = styled.span`
  cursor: pointer;
  color: ${({ $active }) => ($active ? '#222' : '#aaa')};
  padding: 0 1vh;
  transition: color 0.2s, border-bottom 0.2s;
`;

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
    const tab = searchParams.get('lib') || 'formation';
    setActiveLib(tab);
  }, [searchParams]);

  useEffect(() => {
    if (activeTab == 'lib') {
      setIsLib(true);
    } else {
      setIsLib(false);
    }
  }, [activeTab]);

  return (
    <PageWrapper>
      {/* 상단 배너형 탭(타이틀 역할) */}
      <TabBanner>
        {TAB_LIST.map((tab) => (
          <TabItem
            key={tab.key}
            $active={activeTab === tab.key}
            onClick={() => handleTabChange(tab.key)}
          >
            {tab.label}
          </TabItem>
        ))}
      </TabBanner>
      {isLib && (
        <TabBanner>
          {Lib_LIST.map((lib) => (
            <TabItem
              key={lib.key}
              $active={activeLib === lib.key}
              onClick={() => handleLibChange(lib.key)}
            >
              {lib.label}
            </TabItem>
          ))}
        </TabBanner>
      )}
      {/* 탭별 내용 */}
      {isLib && activeLib === 'formation' && (
        <>
          {formations.map((form) => (
            <div key={form.id}>
              <LibCard
                onClick={() => navigate(`/lib/detail/formation/${form.id}`)}
              >
                <LibText>{form.summation}</LibText>
                <LibTitle>{form.title}</LibTitle>
                <LibImage src={form.img} alt={form.title} />
              </LibCard>
            </div>
          ))}
        </>
      )}
      {isLib && activeLib === 'tactics' && (
        <>
          {tactics.map((tactic) => (
            <div key={tactic.id}>
              <LibCard
                onClick={() => navigate(`/lib/detail/tactic/${tactic.id}`)}
              >
                <LibTitle>{tactic.title}</LibTitle>
                <LibText>{tactic.summation}</LibText>
              </LibCard>
            </div>
          ))}
        </>
      )}
      <div className="fixed bottom-[10vh] right-[calc(clamp(1vh,(100vw-50vh)/2+1vh,100vw))] z-[1000] group">
        <button
          onClick={() => setShowModal(true)}
          className="
              w-[6.5vh] h-[6.5vh] rounded-full bg-white border-2 border-green-500
              text-green-500 shadow-lg flex items-center justify-center
              transition-transform duration-150
              group-hover:scale-110 group-hover:shadow-xl active:scale-95
            "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-[3vh] h-[3vh]"
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
          className="
              absolute right-[calc(100%+1.5vh)] top-1/2 -translate-y-1/2
              bg-gray-700 text-white text-[1.6vh] px-[1.2vh] py-[0.7vh]
              rounded-[1vh] shadow whitespace-nowrap
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
            "
        >
          게시글 작성
          <div
            className="
                absolute top-1/2 left-full -translate-y-1/2
                w-0 h-0 border-t-[8px] border-t-transparent
                border-b-[8px] border-b-transparent
                border-l-[8px] border-l-gray-700
              "
          />
        </div>
      </div>
      {showModal && !isLib && <ExpertFeedCreate setShowModal={setShowModal} />}
    </PageWrapper>
  );
};

export default LibPage;

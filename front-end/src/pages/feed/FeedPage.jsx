import { useState } from 'react';
import FeedList from '../../components/feed/FeedList';
import FeedCreate from '../../components/feed/FeedCreate';

const FeedPage = () => {
  const [category, setCategory] = useState('매칭');
  const [showModal, setShowModal] = useState(false);
  const userMail = 'SYS@dankook.ac.kr'; // 나중에 ID로 변경 예정

  return (
    <div className="max-w-md mx-auto bg-gray-100 relative">
      {/* 카테고리 탭 */}
      <div className="flex justify-around mb-4 border-b border-gray-300">
        {['매칭', '팀원 모집', '용병'].map((tab) => (
          <div
            key={tab}
            className={`text-xl py-2 px-1 cursor-pointer ${
              category === tab
                ? 'font-bold border-b-2 border-black'
                : 'font-normal'
            }`}
            onClick={() => setCategory(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* 게시글 목록 */}
      <FeedList category={category} />

      {/* 글쓰기 버튼 */}
      <div className="fixed bottom-40 left-1/2 -translate-x-1/2 w-full max-w-md z-30">
        <div className="absolute right-2 group">
          <button
            onClick={() => setShowModal(true)}
            className="w-16 h-16 border-2 border-green-500 text-green-500 bg-white rounded-full cursor-pointer shadow-lg flex items-center justify-center hover:bg-green-50 active:scale-95 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              className="w-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 3.487a2.32 2.32 0 113.281 3.281L7.5 19.41l-4.245 1.06 1.06-4.244L16.862 3.487z"
              />
            </svg>
          </button>

          {/* 툴팁 */}
          <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-green-50 text-gray-800 text-xl p-2 rounded-lg shadow group-hover:opacity-100 opacity-0 transition-opacity duration-300 whitespace-nowrap">
            {category === '매칭'
              ? '매칭 모집'
              : category === '팀원 모집'
              ? '팀원 모집 '
              : '용병 모집'}
            <div className="absolute top-1/2 left-full -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-green-50"></div>
          </div>
        </div>
      </div>

      {/* 글쓰기 모달 */}
      {showModal && (
        <FeedCreate
          userMail={userMail}
          category={category}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default FeedPage;

import { useState } from 'react';
import UserFeedDelete from './UserFeedDelete';
import CareerUpdate from './CareerUpdate';

const Career = ({ career }) => {
  const [showFile, setShowFile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [update, setUpdate] = useState(false);

  const userId = sessionStorage.getItem('userId');
  const isAuthor = String(userId) === String(career.userId); // 타입 변환하여 비교 오류 방지

  return (
    <div className="border p-4 mb-4 rounded-lg shadow relative">
      {/* 상단 영역 */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-4">
          <p className="font-semibold">{career.title}</p>
          <button
            onClick={() => setShowFile(true)}
            className="text-blue-600 hover:underline"
          >
            파일 보기
          </button>
        </div>

        {/* ... 버튼 및 메뉴 */}
        {isAuthor && (
          <div className="relative">
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              className="text-gray-500 hover:text-gray-800 text-xl"
            >
              ⋯
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-md z-50 overflow-hidden">
                <button
                  onClick={() => {
                    setUpdate(true);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                >
                  ✏️ <span>수정</span>
                </button>
                <UserFeedDelete
                  feedId={career.fileId}
                  userFeed={career}
                  renderButton={({ onClick }) => (
                    <button
                      onClick={() => {
                        onClick();
                        setShowMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      🗑️ <span>삭제</span>
                    </button>
                  )}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* 파일 보기 모달 */}
      {showFile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10001]"
          style={{ zIndex: 10001 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">경력 증명 사진</h2>
              <button onClick={() => setShowFile(false)} className="text-xl">
                ✕
              </button>
            </div>
            <img
              src={`http://52.78.12.127:8080/media/user/${career.realFileName}`}
              alt="경력 증명 이미지"
              className="w-full h-auto rounded"
            />
          </div>
        </div>
      )}
      {update && <CareerUpdate setUpdate={setUpdate} career={career} />}
    </div>
  );
};

export default Career;

import { useState } from "react";

const TeamFeedUpdate = ({ setUpdate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleUpdate = async () => {
    // 업데이트 로직
  };

  return (
    <div onClick={() => setUpdate(false)} className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-[2vh] p-[4vh_3vh] w-[90%] max-w-[360px] box-border shadow-lg relative animate-fadeIn"
      >
        <div className="flex justify-center items-center mb-[4vh] relative">
          <h3 className="text-[2.4vh] font-bold m-0 break-keep">게시글 수정</h3>
          <button onClick={() => setUpdate(false)} className="text-[2.4vh] bg-none border-none cursor-pointer absolute right-0 top-0">✖</button>
        </div>

        <div className="mb-[3vh]">
          <div className="text-[1.7vh] font-semibold mb-[1vh]">팀 <span className="text-green-500 ml-[0.3vh]">⚽</span></div>
        </div>

        {/* 제목 */}
        <div className="mb-[3vh]">
          <div className="text-[1.7vh] font-semibold mb-[1vh]">제목 <span className="text-green-500 ml-[0.3vh]">⚽</span></div>
          <input
            type="text"
            placeholder="제목 입력"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full text-[1.7vh] p-[1.5vh] border border-gray-300 rounded-[1vh] bg-[#f9f9f9] focus:outline-green-500 focus:bg-white box-border"
          />
        </div>

        {/* 내용 */}
        <div className="mb-[3vh]">
          <div className="text-[1.7vh] font-semibold mb-[1vh]">내용 <span className="text-green-500 ml-[0.3vh]">⚽</span></div>
          <textarea
            placeholder="내용 입력"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full text-[1.7vh] p-[1.5vh] border border-gray-300 rounded-[1vh] bg-[#f9f9f9] focus:outline-green-500 focus:bg-white box-border resize-none h-[10vh]"
          />
        </div>

        {/* 등록 버튼 */}
        <button
          onClick={handleUpdate}
          className="w-full bg-green-500 text-white text-[2vh] p-[1.8vh] rounded-[2vh] border-none cursor-pointer mt-[2vh] shadow-md transition hover:bg-green-600 box-border"
        >
          수정
        </button>
      </div>
    </div>
  )
}

export default TeamFeedUpdate;
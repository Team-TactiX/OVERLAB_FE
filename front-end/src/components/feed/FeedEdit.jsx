import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeedEdit = ({ post, onUpdate, onClose }) => {
  const navigate = useNavigate()
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [category, setCategory] = useState(post.category);
  const [matchDay, setMatchDay] = useState(post.matchDay);

  const handleEdit = async () => {
    const res = await fetch(`/api/community/${post.contentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({title, content, category, matchDay}),
    });
    if (res.ok) {
      const updated = await res.json();
      onUpdate(updated);
      alert('수정 완료');
      onClose();
      navigate('/feed')
    } else {
      alert('수정 실패');
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-[2vh] p-[4vh_3vh] w-[90%] max-w-[360px] box-border shadow-lg relative">
        <div className="flex justify-between items-center mb-[3vh]">
          <h3 className="text-[2.4vh] font-bold">게시글 수정</h3>
          <button onClick={onClose}>✖</button>
        </div>
        <textarea value={title} onChange={e => setTitle(e.target.value)} className="w-full mb-[2vh] p-2 border" />
        <textarea value={content} onChange={e => setContent(e.target.value)} className="w-full h-[10vh] p-2 border" />
        <div className="mb-[3vh]">
          <div className="text-[1.7vh] font-semibold mb-[1vh]">카테고리 선택 <span className="text-green-500 ml-[0.3vh]">⚽</span></div>
          <div className="flex gap-[2vh]">
            <button onClick={() => setCategory('매칭')} className={`flex-1 text-[1.7vh] p-[1.5vh_0] border ${category === '매칭' ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300 bg-[#f9f9f9] text-gray-800'} rounded-[1vh] cursor-pointer transition hover:border-green-500`}>매칭</button>
            <button onClick={() => setCategory('팀원 모집')} className={`flex-1 text-[1.7vh] p-[1.5vh_0] border ${category === '팀원 모집' ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300 bg-[#f9f9f9] text-gray-800'} rounded-[1vh] cursor-pointer transition hover:border-green-500`}>팀원 모집</button>
            <button onClick={() => setCategory('용병')} className={`flex-1 text-[1.7vh] p-[1.5vh_0] border ${category === '용병' ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300 bg-[#f9f9f9] text-gray-800'} rounded-[1vh] cursor-pointer transition hover:border-green-500`}>용병</button>
          </div>
        </div>
        {(category === '매칭' || category === '용병') && (
          <div className="mb-[3vh]">
            <div className="text-[1.7vh] font-semibold mb-[1vh]">경기 날짜 <span className="text-green-500 ml-[0.3vh]">⚽</span></div>
            <input
              type="datetime-local"
              value={matchDay}
              onChange={e => setMatchDay(e.target.value)}
              className="w-full text-[1.7vh] p-[1.5vh] border border-gray-300 rounded-[1vh] bg-[#f9f9f9] focus:outline-green-500 focus:bg-white box-border"
            />
          </div>
        )}
        <button onClick={handleEdit} className="w-full mt-[2vh] p-2 bg-green-500 text-white">수정</button>
      </div>
    </div>
  );
};

export default FeedEdit;

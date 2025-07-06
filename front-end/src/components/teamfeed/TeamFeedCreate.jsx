import { useState } from "react";
import styled from "styled-components";
import altImage from '../../img/alt_image.png';

const ImagePreview = styled.img`
  width: 30vh;
  height: 30vh;
  margin: 2vh;
  object-fit: fill;
`;

const StyledVideo = styled.video`
  width: 30vh;
  height: 30vh;
  margin: 2vh;
  object-fit: fill;
  border-radius: 1vh;
`;

const TeamFeedCreate = ({ teamId, setCreate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null); // 파일 객체 (image or video)
  const [fileUrl, setFileUrl] = useState(null); // 미리보기 URL

  const handleFileUpload = (e) => {
    const uploaded = e.target.files[0];
    if (uploaded) {
      setFile(uploaded);
      setFileUrl(URL.createObjectURL(uploaded));
    }
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      alert('내용을 전부 입력해주세요.');
      return;
    }


    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("teamId", teamId);
        formData.append("title", title);
        formData.append("content", content);

      const response = await fetch('http://52.78.12.127:8080/api/files/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('팀 게시글 등록 완료!');
        window.location.reload();
      } else {
        alert(await response.text() || '팀 게시글 등록 실패');
      }
    } catch (error) {
      console.error('팀 생성 중 오류:', error);
      alert('서버 요청 중 문제가 발생했습니다.');
    }
  };

  return (
    <div onClick={() => setCreate(false)} className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-[2vh] p-[4vh_3vh] w-[90%] max-w-[360px] box-border shadow-lg relative animate-fadeIn"
      >
        <div className="flex justify-center items-center mb-[4vh] relative">
          <h3 className="text-[2.4vh] font-bold m-0 break-keep">게시글 작성</h3>
          <button onClick={() => setCreate(false)} className="text-[2.4vh] bg-none border-none cursor-pointer absolute right-0 top-0">✖</button>
        </div>

        {/* 파일 미리보기 */}
        <div className="mb-[3vh]">
          <div className="text-[1.7vh] font-semibold mb-[1vh]">파일 <span className="text-green-500 ml-[0.3vh]">📎</span></div>
          <label>
            {file && file.type.startsWith('video/') ? (
              <StyledVideo src={fileUrl} controls />
            ) : (
              <ImagePreview
                src={fileUrl || altImage}
                onError={(e) => { e.target.src = altImage; }}
              />
            )}
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        {/* 제목 */}
        <div className="mb-[3vh]">
          <div className="text-[1.7vh] font-semibold mb-[1vh]">제목 <span className="text-green-500 ml-[0.3vh]">✏️</span></div>
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
          <div className="text-[1.7vh] font-semibold mb-[1vh]">내용 <span className="text-green-500 ml-[0.3vh]">📝</span></div>
          <textarea
            placeholder="내용 입력"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full text-[1.7vh] p-[1.5vh] border border-gray-300 rounded-[1vh] bg-[#f9f9f9] focus:outline-green-500 focus:bg-white box-border resize-none h-[10vh]"
          />
        </div>

        {/* 등록 버튼 */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white text-[2vh] p-[1.8vh] rounded-[2vh] border-none cursor-pointer mt-[2vh] shadow-md transition hover:bg-green-600 box-border"
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default TeamFeedCreate;

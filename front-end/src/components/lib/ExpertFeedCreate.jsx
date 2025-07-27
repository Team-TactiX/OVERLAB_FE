import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

/* 애니메이션 */
const slideUp = keyframes`
  from { transform: translateY(10%); opacity:0; }
  to   { transform: translateY(0);   opacity:1; }
`;

/* 모달 백드롭 + 시트 */
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Sheet = styled.div`
  width: 92%;
  max-width: 430px;
  background: #fff;
  border-radius: 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  animation: ${slideUp} 0.25s ease-out;
`;

/* 상단바 */
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  button {
    background: none;
    border: none;
    font-size: 14px;
    color: #00c851;
    font-weight: 500;
    cursor: pointer;
  }
`;

/* 제목 + 첨부 아이콘 */
const TitleLine = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #e0e0e0;
  input {
    flex: 1;
    border: none;
    font-size: 15px;
    background: transparent;
    color: #333;
    &:focus {
      outline: none;
    }
  }
  label {
    cursor: pointer;
  }
  svg {
    width: 20px;
    height: 20px;
    stroke: #388e3c;
  }
`;

const HiddenFile = styled.input`
  display: none;
`;

/* 본문 */
const BodyInput = styled.textarea`
  border: none;
  resize: none;
  height: 22vh;
  font-size: 15px;
  padding: 16px;
  color: #333;
  &::placeholder {
    color: #bdbdbd;
  }
  &:focus {
    outline: none;
  }
`;

/* 미리보기 */
const FilePreviewBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const PreviewImg = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 0;
`;

const PreviewVideo = styled.video`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 0;
`;

/* 하단 등록 버튼 */
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px;
`;

const Save = styled.button`
  background: ${({ disabled }) => (disabled ? '#b2dfbc' : '#00c851')};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  border: none;
  border-radius: 999px;
  color: white;
  font-size: 14px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover:enabled {
    background: #00b44a;
  }
`;

const ExpertFeedCreate = ({ setShowModal }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const modalRef = useRef(null);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const keyHandler = (e) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    window.addEventListener('keydown', keyHandler);
    return () => window.removeEventListener('keydown', keyHandler);
  }, [setShowModal]);

  const onSelect = (f) => {
    if (f) {
      setFile(f);
      setFileURL(URL.createObjectURL(f));
    }
  };

  const handleFile = (e) => onSelect(e.target.files?.[0]);

  const submit = async () => {
    if (!title.trim() || !content.trim())
      return alert('제목과 내용을 입력하세요');

    try {
      const formData = new FormData();
      if (file) formData.append('file', file);
      formData.append('userId', userId);
      formData.append('title', title);
      formData.append('content', content);

      const res = await fetch(
        'http://52.78.12.127:8080/api/users/files/expert/upload',
        {
          method: 'POST',
          body: formData,
        },
      );

      if (!res.ok) throw new Error('등록 실패');

      alert('전문가 피드 등록 완료!');
      setShowModal(false);
      window.location.reload();
    } catch (e) {
      alert('에러가 발생했습니다.');
    }
  };

  return (
    <Backdrop onClick={() => setShowModal(false)}>
      <Sheet ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <TopBar>
          <div>전문가 게시글 작성</div>
          <button onClick={() => setShowModal(false)}>취소</button>
        </TopBar>

        <TitleLine>
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="file-upload">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </label>
          <HiddenFile
            id="file-upload"
            type="file"
            accept="image/*,video/*"
            onChange={handleFile}
          />
        </TitleLine>

        {fileURL && (
          <FilePreviewBox>
            {file.type.startsWith('image/') ? (
              <PreviewImg src={fileURL} alt="미리보기" />
            ) : file.type.startsWith('video/') ? (
              <PreviewVideo src={fileURL} controls />
            ) : (
              <div>지원하지 않는 파일 형식입니다.</div>
            )}
          </FilePreviewBox>
        )}

        <BodyInput
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Footer>
          <Save disabled={!title.trim() || !content.trim()} onClick={submit}>
            등록
          </Save>
        </Footer>
      </Sheet>
    </Backdrop>
  );
};

export default ExpertFeedCreate;

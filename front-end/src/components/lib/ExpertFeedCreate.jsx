import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import altImage from '../../img/alt_image.png';

/* ── 애니메이션 & 기본 레이아웃 ───────────────────────────── */
const slideUp = keyframes`
  from { transform: translateY(10%); opacity:0; }
  to   { transform: translateY(0);   opacity:1; }
`;
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
  border-radius: 1.6vh;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  animation: ${slideUp} 0.25s ease-out;
`;

/* ── 상단바 (닫기·제목·저장) ─────────────────────────────── */
const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.2vh 2vh 2.2vh 1.2vh;
  border-bottom: 1px solid #e0e0e0;
  font-size: 2vh;
  font-weight: 600;
  svg {
    width: 2.4vh;
    height: 2.4vh;
    stroke: #333;
    cursor: pointer;
  }
  button {
    background: none;
    border: none;
    font-size: 1.8vh;
    color: #00c851;
  }
`;

/* ── 제목 + 첨부 아이콘 라인 ────────────────────────────── */
const TitleLine = styled.div`
  display: flex;
  align-items: center;
  padding: 1.4vh 2vh;
  border-bottom: 1px solid #e0e0e0;
  font-size: 1.8vh;
  input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 1.8vh;
    padding: 0;
    &:focus {
      outline: none;
    }
  }
  label {
    cursor: pointer;
  }
  svg {
    width: 2.2vh;
    height: 2.2vh;
    stroke: #1976d2;
  }
`;

/* ── 내용 입력 ─────────────────────────────────────────── */
const BodyInput = styled.textarea`
  border: none;
  resize: none;
  height: 22vh;
  font-size: 1.7vh;
  padding: 2vh;
  ::placeholder {
    color: #b5b5b5;
  }
  &:focus {
    outline: none;
  }
`;

/* ── 하단 저장 버튼 ────────────────────────────────────── */
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1.6vh 2vh 2.4vh;
`;
const Save = styled.button`
  background: ${({ disabled }) => (disabled ? '#b2dfbc' : '#00c851')};
  opacity: ${({ disabled }) => (disabled ? 0.65 : 1)};
  border: none;
  border-radius: 1.6vh;
  color: #fff;
  font-size: 1.8vh;
  padding: 1.2vh 3.6vh;
  cursor: ${({ disabled }) => 'pointer'};
  transition: transform 0.1s;
  &:active:not(:disabled) {
    transform: scale(0.97);
  }
`;

/* ── 미리보기 (작은 정사각형) ──────────────────────────── */
const FilePreviewBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.5vh 0 1.5vh; /* 하단 여백 줄 추가 */
  border-bottom: 1px solid #e0e0e0;
`;

const PreviewImg = styled.img`
  width: 40vh;
  height: 20vh;
  object-fit: cover;
  border-radius: 1vh;
`;

const PreviewVideo = styled.video`
  width: 40vh;
  height: 20vh;
  object-fit: cover;
  border-radius: 1vh;
`;
/* 숨겨진 파일 input */
const HiddenFile = styled.input`
  display: none;
`;

/* ── Main Component ───────────────────────────────────── */
const ExpertFeedCreate = ({ setShowModal }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const modalRef = useRef(null);
  const userId = sessionStorage.getItem('userId');

  /* ESC 닫기 + TAB 포커스 루프 */
  useEffect(() => {
    const key = (e) => {
      if (e.key === 'Escape') setShowModal(false);
      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'button,input,textarea',
        );
        const f = focusables[0],
          l = focusables[focusables.length - 1];
        if (!focusables.length) return;
        if (
          e.shiftKey
            ? document.activeElement === f
            : document.activeElement === l
        ) {
          e.preventDefault();
          (e.shiftKey ? l : f).focus();
        }
      }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [setShowModal]);

  /* 파일 선택/드래그 */
  const onSelect = (f) => {
    if (f) {
      setFile(f);
      setFileURL(URL.createObjectURL(f));
    }
  };
  const handleFile = (e) => onSelect(e.target.files?.[0]);
  const onDrop = (e) => {
    e.preventDefault();
    onSelect(e.dataTransfer.files?.[0]);
  };

  /* 저장 */
  const submit = async () => {
    if (!title.trim() || !content.trim()) return alert('제목·내용 입력!');

    try {
      const fd = new FormData();
      if (file) fd.append('file', file);
      fd.append('userId', userId);
      fd.append('title', title);
      fd.append('content', content);

      console.log(fd);

      const res = await fetch(
        'http://52.78.12.127:8080/api/users/files/expert/upload',
        {
          method: 'POST',
          body: fd,
        },
      );
      if (res.ok) {
        alert('게시글 등록 완료!');
        window.location.reload();
      } else alert((await res.text()) || '등록 실패');
    } catch (err) {
      console.error(err);
      alert('요청 중 오류');
    }
  };

  return (
    <Backdrop onClick={() => setShowModal(false)}>
      <Sheet ref={modalRef} onClick={(e) => e.stopPropagation()}>
        {/* ── Top bar ── */}
        <TopBar>
          <svg
            onClick={() => setShowModal(false)}
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 6 6 18M6 6l12 12"
            />
          </svg>
          글쓰기
          <button onClick={submit}>저장</button>
        </TopBar>

        {/* ── 제목 + 클립 ── */}
        <TitleLine>
          <input
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 11.5V7a5 5 0 00-10 0v9a3 3 0 006 0V9"
              />
            </svg>
            <HiddenFile
              type="file"
              accept="image/*,video/*"
              onChange={handleFile}
            />
          </label>
        </TitleLine>

        {/* ── 파일 미리보기 (선택 시) ── */}
        {file && (
          <FilePreviewBox
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
          >
            {file.type.startsWith('video/') ? (
              <PreviewVideo src={fileURL} controls />
            ) : (
              <PreviewImg src={fileURL} alt="preview" />
            )}
          </FilePreviewBox>
        )}

        {/* ── 내용 입력 ── */}
        <BodyInput
          placeholder="내용을 입력하세요…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* ── 저장 버튼 ── */}
        <Footer>
          <Save disabled={!title.trim() || !content.trim()} onClick={submit}>
            저장
          </Save>
        </Footer>
      </Sheet>
    </Backdrop>
  );
};

export default ExpertFeedCreate;

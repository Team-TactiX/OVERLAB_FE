import { useEffect, useRef, useState } from 'react';
import formations from '../../data/formation.json';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormationCarousel = () => {
  const formationsLength = formations.length;
  const loopedOnce = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(
    Math.floor(Math.random() * formations.length)
  );
  const navigate = useNavigate();

  const handleMove = () => {
    navigate(`/lib/detail/formation/${formations[currentIndex].id}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === formationsLength - 1) {
          clearInterval(interval);
          loopedOnce.current = true;
          return 0;
        }
        return prev + 1;
      });
    }, 1); // 초기에 빠르게 순환 (무한 루프 방지용)

    return () => clearInterval(interval);
  }, [formationsLength]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === formationsLength - 1 ? 0 : prev + 1
      );
    }, 5000); // 5초마다 자동 슬라이드

    return () => clearInterval(interval);
  }, [formationsLength]);

  const currentFormation = formations[currentIndex];

  return (
    <Container>
      <div className="w-full mb-[2vh] flex justify-center items-center pt-[1vh]">
        {/* 카드 */}
        <div
          key={currentFormation.id}
          className="relative w-[90%] max-w-[70vh] cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition"
          onClick={handleMove}
        >
          <img
            src={currentFormation.img}
            alt={currentFormation.title}
            className="w-full object-contain"
          />

          {/* 텍스트 오버레이 */}
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent text-white text-center p-[1.5vh]">
            <div className="text-[2.5vh] font-bold truncate">
              {currentFormation.title}
            </div>
            <div className="text-[1.5vh] truncate">
              {currentFormation.summation}
            </div>
          </div>
        </div>
      </div>

      {/* 인디케이터 */}
      <div className="flex gap-[1vh] mt-[1vh]">
        {Array.from({ length: formationsLength }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-[1vh] h-[1vh] rounded-full transition ${
              currentIndex === idx ? 'bg-green-500' : 'bg-gray-300'
            }`}
          ></button>
        ))}
      </div>
    </Container>
  );
};

export default FormationCarousel;

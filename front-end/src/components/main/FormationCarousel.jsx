import { useState } from 'react';
import formations from '../../data/formation.json';
import { useNavigate } from 'react-router-dom';

const FormationCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(
    Math.floor(Math.random() * formations.length)
  );
  const navigate = useNavigate();

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? formations.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === formations.length - 1 ? 0 : prev + 1));
  };

  const handleMove = () => {
    navigate(`/lib/detail/formation/${formations[currentIndex].id}`);
  };

  const currentFormation = formations[currentIndex];

  return (
    <div className="w-full mb-[2vh] flex justify-center items-center gap-[1vh] pt-[3vh]">
      {/* Prev Button */}
      <button
        onClick={handlePrev}
        className="text-[3.5vh] text-gray-400 hover:text-green-500 active:scale-90 transition"
      >
        «
      </button>

      {/* 포스터형 */}
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

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="text-[3.5vh] text-gray-400 hover:text-green-500 active:scale-90 transition"
      >
        »
      </button>
    </div>
  );
};

export default FormationCarousel;

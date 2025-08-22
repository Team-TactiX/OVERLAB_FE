import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import formations from '../../data/formation.json';

const FormationCarousel = () => {
  const navigate = useNavigate();
  const formationsLength = formations.length;

  const [currentIndex, setCurrentIndex] = useState(
    Math.floor(Math.random() * formationsLength),
  );

  const startX = useRef(0);

  const handleSwipe = useCallback(
    (endX) => {
      const diff = startX.current - endX;
      const threshold = 10;

      if (diff > threshold) {
        setCurrentIndex((prev) => (prev + 1) % formationsLength);
      } else if (diff < -threshold) {
        setCurrentIndex(
          (prev) => (prev - 1 + formationsLength) % formationsLength,
        );
      }
    },
    [formationsLength],
  );

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    handleSwipe(e.changedTouches[0].clientX);
  };
  const handleMouseDown = (e) => {
    startX.current = e.clientX;
  };
  const handleMouseUp = (e) => {
    handleSwipe(e.clientX);
  };

  const handleMove = () => {
    navigate(`/lib/detail/formation/${formations[currentIndex].id}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % formationsLength);
    }, 10000);

    return () => clearInterval(interval);
  }, [formationsLength]);

  const currentFormation = formations[currentIndex];

  return (
    <div
      className="flex flex-col justify-center items-center w-full"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="w-full mb-4 flex justify-center items-center pt-2">
        <div
          key={currentFormation.id}
          className="relative w-[90%] max-w-2xl cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition"
          onClick={handleMove}
        >
          <img
            src={currentFormation.img}
            alt={currentFormation.title}
            className="w-full object-contain"
            draggable={false}
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent text-white text-center p-4 select-none">
            <div className="text-2xl font-bold truncate">
              {currentFormation.title}
            </div>
            <div className="text-base truncate">
              {currentFormation.summation}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        {formations.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition ${
              currentIndex === idx ? 'bg-green-500' : 'bg-gray-300'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default FormationCarousel;

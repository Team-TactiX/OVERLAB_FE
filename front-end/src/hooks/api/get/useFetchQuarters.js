import { useState } from 'react';

const useFetchQuarters = () => {
  const [quarters, setQuarters] = useState([]);

  const fetchQuarters = async ({ gameId }) => {
    if (!gameId) return;

    try {
      const response = await fetch(
        `http://52.78.12.127:8080/api/quarters/getQuarterList/${gameId}`,
      );
      const data = await response.json();
      if (response.ok) {
        setQuarters(data);
      } else {
        alert('쿼터 목록 패치 중 오류 발생');
        console.error(data);
      }
    } catch (err) {
      alert('서버 오류 발생');
      console.error(err);
    }
  };

  return { quarters, setQuarters, fetchQuarters };
};

export default useFetchQuarters;

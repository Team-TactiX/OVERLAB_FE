import { useState } from 'react';
const baseURL = import.meta.env.VITE_API_BASE_URL;

const useFetchQuarters = () => {
  const [quarters, setQuarters] = useState([]);

  const fetchQuarters = async ({ gameId }) => {
    if (!gameId) return;

    try {
      const response = await fetch(
        `${baseURL}/api/quarters/getQuarterList/${gameId}`,
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

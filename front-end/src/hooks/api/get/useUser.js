import { useState } from 'react';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const useUser = () => {
  const [user, setUser] = useState('');

  const fetchUser = async (userId) => {
    try {
      const response = await fetch(`${baseURL}/api/users/check/id/${userId}`);

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        const errMsg = await response.text();
        alert('오류발생');
        console.error(errMsg);
      }
    } catch (err) {
      console.error('오류:', err);
      alert('서버와의 통신 중 오류가 발생했습니다.');
    }
  };

  return { user, fetchUser };
};

export default useUser;

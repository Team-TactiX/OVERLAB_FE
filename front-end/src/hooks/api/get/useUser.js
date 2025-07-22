import { useEffect, useState } from 'react';

const useUser = ({ userId }) => {
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://52.78.12.127:8080/api/users/check/id/${userId}`,
        );

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

    fetchUser();
  }, [userId]);

  return { user };
};

export default useUser;

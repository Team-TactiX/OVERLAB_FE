import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useLogin = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async ({ userMail, password }) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMail, password }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('userMail', data.userMail);
        sessionStorage.setItem('userId', data.userId);
        navigate('/main');
      } else {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || '아이디 또는 비밀번호를 확인하세요.';
        alert(errorMessage);
        console.error('로그인 실패:', errorData);
      }
    } catch (err) {
      console.error('로그인 오류:', err);
      alert('서버와의 통신 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, login };
};

export default useLogin;

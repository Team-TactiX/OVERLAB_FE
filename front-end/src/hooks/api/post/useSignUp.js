import { useNavigate } from 'react-router-dom';
const baseURL = import.meta.env.VITE_API_BASE_URL;

const useSignUp = () => {
  const navigate = useNavigate();

  const signUp = async ({ body }) => {
    try {
      const response = await fetch(`${baseURL}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
      });

      if (response.ok) {
        alert('회원가입 완료!');
        navigate('/');
      } else {
        const err = await response.text();
        alert(err || '포지션 설정 실패');
      }
    } catch (error) {
      console.error('서버 요청 중 오류:', error);
      alert('서버 요청 중 문제가 발생했습니다.');
    }
  };

  return { signUp };
};

export default useSignUp;

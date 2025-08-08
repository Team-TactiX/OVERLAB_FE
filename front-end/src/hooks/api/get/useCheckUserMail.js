const baseURL = import.meta.env.VITE_API_BASE_URL;

const useCheckUserMail = ({ onNext }) => {
  const checkUserMail = async (value) => {
    if (!value) {
      alert('이메일을 입력하세요.');
      return;
    }
    if (!value.includes('@')) {
      alert('이메일 형식이 올바르지 않습니다.');
      return;
    }
    try {
      const response = await fetch(
        `${baseURL}/api/users/userMail-check?userMail=${value}`,
      );

      if (response.ok) {
        alert('이미 존재하는 이메일입니다.');
        return;
      } else {
        onNext();
      }
    } catch (error) {
      console.error('서버 요청 중 오류:', error);
      alert('서버 요청 중 문제가 발생했습니다.');
    }
  };

  return { checkUserMail };
};

export default useCheckUserMail;

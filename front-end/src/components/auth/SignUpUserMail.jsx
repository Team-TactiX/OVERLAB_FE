import { useState } from 'react';
import InputField from '../common/InputField';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const SignUpUserMail = ({ value, onChange, onNext }) => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!value) {
      setError('이메일을 입력하세요.');
      return;
    }
    if (!value.includes('@')) {
      setError('이메일 형식이 올바르지 않습니다.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${baseURL}/api/users/userMail-check?userMail=${value}`,
      );

      if (response.ok) {
        setError('이미 존재하는 이메일입니다.');
      } else if (response.status === 404) {
        onNext();
      } else {
        setError('이메일 확인 중 문제가 발생했습니다.');
      }
    } catch (err) {
      console.error('서버 요청 중 오류:', err);
      setError('서버와의 통신 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    onChange(e.target.value);
    if (error) {
      setError(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xs mx-auto mt-10 flex flex-col gap-5"
    >
      <InputField
        label="이메일"
        type="email"
        placeholder="이메일을 입력하세요"
        value={value}
        onChange={handleInputChange}
        onClear={() => onChange('')}
        error={error}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-11 bg-[#00B140] rounded-lg text-white font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? '확인 중...' : '계속'}
      </button>
    </form>
  );
};

export default SignUpUserMail;

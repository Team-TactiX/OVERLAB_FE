import { useState } from 'react';
import useLogin from '../../hooks/api/post/useLogin';
import InputField from '../common/InputField'; // 새로 만든 InputField를 import

const LoginForm = () => {
  const [userMail, setUserMail] = useState('');
  const [password, setPassword] = useState('');
  // 에러 메시지를 객체 형태로 관리하기 위한 상태
  const [errors, setErrors] = useState({});

  const { isLoading, login } = useLogin();

  const handleLogin = async (event) => {
    event.preventDefault();

    // 제출 시 에러 객체를 새로 생성
    const newErrors = {};
    if (!userMail) newErrors.userMail = '이메일을 입력해주세요.';
    if (!password) newErrors.password = '비밀번호를 입력해주세요.';

    // 에러가 하나라도 있으면 에러 상태를 업데이트하고, 로그인 요청을 보내지 않음
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 에러가 없으면 로그인 함수 호출
    login({ userMail, password });
  };

  // input 값이 변경될 때마다 해당 필드의 에러를 지워주는 함수
  const handleInputChange = (setter, fieldName) => (e) => {
    setter(e.target.value);
    // 현재 필드에 에러가 있다면, 그 에러만 지워줌
    if (errors[fieldName]) {
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: null }));
    }
  };

  return (
    <div className="w-full max-w-sm px-4">
      <h2 className="mb-6 text-2xl font-semibold text-center text-black">
        계정에 로그인하세요
      </h2>

      <form onSubmit={handleLogin} className="flex flex-col">
        <div className="flex flex-col gap-4">
          <InputField
            label="이메일"
            type="email"
            value={userMail}
            placeholder="이메일을 입력하세요"
            onChange={handleInputChange(setUserMail, 'userMail')}
            onClear={() => setUserMail('')}
            error={errors.userMail} // 이메일 필드에 해당하는 에러 메시지를 전달
          />
          <InputField
            label="비밀번호"
            type="password"
            value={password}
            placeholder="비밀번호를 입력하세요"
            onChange={handleInputChange(setPassword, 'password')}
            onClear={() => setPassword('')}
            error={errors.password} // 비밀번호 필드에 해당하는 에러 메시지를 전달
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="h-11 mt-6 mb-6 font-semibold text-white bg-[#00B140] rounded-lg hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

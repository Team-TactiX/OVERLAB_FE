import { Link } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import logo from '../../assets/logo.png';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4">
      {/* 로고 이미지 */}
      <img
        src={logo}
        alt="OVERLAB Logo"
        className="w-full max-w-[16rem] mb-8"
      />

      <LoginForm />

      {/* 회원가입 링크 */}
      <div className="text-base text-gray-500">
        <span>아직 계정이 없으신가요?&nbsp;</span>
        <Link
          to="/signup"
          className="font-semibold text-[#00B140] hover:underline"
        >
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;

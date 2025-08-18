import { Link } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import logo from '../../assets/logo.png';

const LoginPage = () => {
  return (
    <div className="h-screen bg-white flex flex-col justify-center items-center relative">
      {/* 로고 이미지 */}
      <img
        src={logo}
        alt="OVERLAB Logo"
        className="w-[clamp(250px,38%,350px)] mb-[3vh]"
      />

      <LoginForm />

      <div className="text-[16px] text-gray-500">
        <span>아직 계정이 없으신가요?&nbsp;</span>
        <Link to="/signup" className="text-[#00B140] hover:underline">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;

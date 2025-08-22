import { Link } from 'react-router-dom';
import SignUp from '../../components/auth/SignUp';
import logo from '../../assets/logo.png';

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4">
      {/* 로고 이미지 */}
      <img
        src={logo}
        alt="OVERLAB Logo"
        className="w-full max-w-[16rem] mb-8"
      />

      <h2 className="mb-6 text-heading-2 font-semibold text-black">회원가입</h2>

      <SignUp />
      <Link to="/" className="mt-8 text-base text-gray-500 hover:underline">
        로그인 페이지로 이동
      </Link>
    </div>
  );
};

export default SignUpPage;

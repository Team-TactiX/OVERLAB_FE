import SignUp from '../../components/auth/SignUp';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png";

const SignUpPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6 relative">
      {/* 로고 이미지로 변경 */}
      <img src={logo} alt="OVERLAB Logo" className="h-[6vh] mb-[4vh]" />

      <h2 className="mt-[3vh] text-[26px] font-semibold text-black">회원가입</h2>

      <SignUp />

      <p className="mt-[6vh] text-[16px] text-gray-500 hover:underline cursor-pointer" onClick={() => navigate('/')}>
        로그인 페이지로 이동
      </p>
    </div>
  );
};

export default SignUpPage;

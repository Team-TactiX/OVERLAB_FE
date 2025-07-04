import { Link } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6 relative">
      <h1 className="text-green-600 text-[45px] font-extrabold font-['Poppins']">Ground Hub</h1>
      <LoginForm />
      <div className="mt-[6vh] text-[16px] text-gray-500">
        <span>아직 계정이 없으신가요?&nbsp;</span>
        <Link to="/signup" className="text-[#00B140] hover:underline">회원가입</Link>
      </div>
    </div>
  );
};

export default LoginPage;

 const handleSocialLogin = (provider) => {
    const baseURL = axiosInstance.defaults.baseURL.replace('/api', '');
    const providers = {
      카카오: "http://localhost:8080/oauth2/authorization/kakao",
    };
    
    if (providers[provider]) {
      console.log(`🔗 ${provider} 소셜 로그인:`, providers[provider]);
      window.location.href = providers[provider];
    }
  };

  return (
    <>

      {/*  소셜 로그인 안내 및 버튼 */}
      <div className="divider">또는 다른 서비스 계정으로 로그인</div>
      <div className="social-login-group">
        <button 
          className="social-btn kakao" 
          onClick={() => handleSocialLogin("카카오")}
          disabled={isLoading}
        >
          <img src="/assets/kakao_icon.png" alt="카카오 로그인" />
        </button>
        
      </div>
    </>
  );
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import "../../styles/AuthForm.css";

export default function SignupForm() {
  const navigate = useNavigate();

  // 상태 관리
  const [formData, setFormData] = useState({
    email: "",           // 아이디 (BE의 email 필드)
    recoveryEmail: "",   // 복구용 실제 이메일
    nickname: "",        // 닉네임
    password: "",        // 비밀번호
    confirmPassword: "", // 비밀번호 확인
  });
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 에러 메시지 초기화
    if (error) setError("");
  };

  // 실시간 유효성 검증
  const validate = () => {
    const { email, recoveryEmail, nickname, password, confirmPassword } = formData;
    
    // BE와 동일한 유효성 검증 규칙
    const idRegex = /^[a-z0-9]{4,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    const nicknameRegex = /^[A-Za-z0-9]{2,10}$/; // BE는 2-10자

    if (!email.trim()) return "아이디를 입력해주세요.";
    if (!idRegex.test(email)) return "아이디는 영문 소문자와 숫자 4~20자여야 합니다.";
    
    if (!recoveryEmail.trim()) return "복구용 이메일을 입력해주세요.";
    if (!emailRegex.test(recoveryEmail)) return "유효한 복구 이메일을 입력해주세요.";
    
    if (!nickname.trim()) return "닉네임을 입력해주세요.";
    if (!nicknameRegex.test(nickname)) return "닉네임은 영어/숫자 2~10자여야 합니다.";
    
    if (!password.trim()) return "비밀번호를 입력해주세요.";
    if (!pwRegex.test(password)) return "비밀번호는 영문, 숫자, 특수문자 포함 8~20자여야 합니다.";
    
    if (!confirmPassword.trim()) return "비밀번호 확인을 입력해주세요.";
    if (password !== confirmPassword) return "비밀번호가 일치하지 않습니다.";
    
    return null;
  };

  // 회원가입 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // 유효성 검증
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    // BE API 호출 데이터 준비
    const signupData = {
      email: formData.email,           // 아이디
      recoveryEmail: formData.recoveryEmail, // 복구용 이메일
      nickname: formData.nickname,     // 닉네임  
      password: formData.password,     // 비밀번호
      confirmPassword: formData.confirmPassword, // 비밀번호 확인
      role: "USER"                     // 기본 역할
    };

    try {
      console.log("🚀 회원가입 요청 데이터:", signupData);
      
      // BE API 호출
      const response = await axiosInstance.post("/users/signup", signupData);
      
      console.log("✅ 회원가입 성공:", response.data);
      // ❌ 중복 토스트 제거: navigate state 메시지로 충분함
      // toast.success("회원가입 성공! 로그인 페이지로 이동합니다.");
      
      // 로그인 페이지로 이동
      navigate("/login", { 
        state: { 
          message: "회원가입이 완료되었습니다. 로그인해주세요.",
          email: formData.email 
        }
      });
      
    } catch (error) {
      console.error("❌ 회원가입 실패:", error);
      
      // 서버 에러 처리
      if (error.response) {
        const { status, data } = error.response;
        
        if (status === 400) {
          // 유효성 검증 실패
          setError(data.message || "입력 정보를 확인해주세요.");
        } else if (status === 409) {
          // 중복된 이메일
          setError("이미 사용 중인 아이디입니다.");
        } else {
          setError("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
      } else if (error.request) {
        // 네트워크 오류
        setError("서버에 연결할 수 없습니다. 네트워크를 확인해주세요.");
      } else {
        setError("예상치 못한 오류가 발생했습니다.");
      }
      
      // ❌ 중복 토스트 제거: setError로 에러 메시지 표시가 충분함
      // toast.error("회원가입에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };


  // 소셜 로그인 처리
  const handleSocialLogin = (provider) => {
    const providers = {
      카카오: "http://localhost:8080/oauth2/authorization/kakao",
    };
    
    if (providers[provider]) {
      console.log(`🔗 ${provider} 소셜 로그인:`, providers[provider]);
      window.location.href = providers[provider];
    }
  };

  return (
    <div className="auth-container">

      <div className="divider">또는 다른 서비스 계정으로 로그인</div>

      <div className="social-login-group">
        <button 
          className="social-btn kakao" 
          onClick={() => handleSocialLogin("카카오")}
          disabled={isLoading}
        >
          <img src="/assets/kakao_icon.png" alt="카카오 로그인" />
        </button>

      </div>

      <div className="auth-links">
        <p>
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </p>
      </div>
    </div>
  );
}

//  OAuthCallback.jsx - 소셜 로그인 후 서버 연동 + 실패 시 localStorage fallback 구조 추가
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { useUser } from '../UserContext';
import axiosNoApi from "../../api/axiosNoApi";

export default function OAuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUser();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    const provider = query.get('provider');

    if (token) {
      localStorage.setItem('access_token', token);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const fetchUser = async () => {
        try {
          const res = await axiosNoApi.get('/users/me');
          const userData = {
            ...res.data,
            linkedSocials: [provider],
          };
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);

          if (userData.role === 'ADMIN') navigate('/admin');
          else if (userData.role === 'SHOP_OWNER') navigate('/admin/upload');
          else navigate('/');
        } catch (err) {
          console.error('❌ 소셜 로그인 실패:', err);
          
          // ❌ localStorage fallback 제거 - 실제 서버 응답에만 의존
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          delete axiosInstance.defaults.headers.common['Authorization'];
          
          alert('소셜 로그인에 실패했습니다. 다시 시도해주세요.');
          navigate('/login');
        }
      };

      fetchUser();
    } else {
      alert('소셜 로그인 실패: 유효한 토큰이 없습니다.');
      navigate('/login');
    }
  }, [location.search, navigate, setUser]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2> 로그인 중입니다...</h2>
    </div>
  );
}

import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import ResetPasswordModal from './ResetPasswordModal';

export default function FindForm({ mode = 'id', onClose }) {
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [email, setEmail] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState(null);
  const [foundId, setFoundId] = useState('');

  const handleFind = async () => {
    if (mode === 'id') {
      if (!recoveryEmail) return alert('이메일을 입력하세요.');
      try {
        const res = await axiosInstance.post('/users/find-id', {
          recoveryEmail,
        });
        setFoundId(res.data);
      } catch (err) {
        console.error('❌ 아이디 찾기 실패:', err);
        alert('일치하는 사용자를 찾을 수 없습니다.');
      }
    } else {
      if (!email || !recoveryEmail) return alert('아이디와 이메일을 모두 입력하세요.');
      try {
        await axiosInstance.post('/users/find-pw', {
          email,
          recoveryEmail,
        });
        setVerifiedUser({ email, recoveryEmail });
        setShowResetModal(true);
      } catch (err) {
        console.error('❌ 비밀번호 찾기 실패:', err);
        alert('일치하는 사용자를 찾을 수 없습니다.');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2 className="auth-title">{mode === 'id' ? '아이디 찾기' : '비밀번호 찾기'}</h2>

        {mode === 'id' ? (
          <>
            <input
              type="email"
              value={recoveryEmail}
              onChange={(e) => setRecoveryEmail(e.target.value)}
              placeholder="가입 시 입력한 본인 이메일"
            />
            <button onClick={handleFind} className="submit-btn blue">아이디 찾기</button>
            {foundId && (
              <div className="result-box">
                <p>가입된 아이디: <strong>{foundId}</strong></p>
              </div>
            )}
          </>
        ) : (
          <>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="아이디"
            />
            <input
              type="email"
              value={recoveryEmail}
              onChange={(e) => setRecoveryEmail(e.target.value)}
              placeholder="가입 시 입력한 본인 이메일"
            />
            <button onClick={handleFind} className="submit-btn blue">비밀번호 찾기</button>
          </>
        )}

        <button onClick={onClose} className="cancel-btn">닫기</button>

        {showResetModal && verifiedUser && (
          <ResetPasswordModal
            email={verifiedUser.email}
            onClose={() => setShowResetModal(false)}
          />
        )}
      </div>
    </div>
  );
}


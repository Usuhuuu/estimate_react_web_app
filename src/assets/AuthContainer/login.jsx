import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import ReactModal from 'react-modal';
import "../CSS/login.css";
import { IoLogoApple } from 'react-icons/io5';
const urlApi =  'http://localhost:3001';

function LoginPage({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrors] = useState('');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${urlApi}/auth/login`, { email, password }, { withCredentials: true });
      if (response.status === 200) {
        localStorage.setItem('authToken', response.data.accessToken);
        handleLogin(true);
      } else {
        setErrors('Login failed. Please check your credentials.');
        setIsErrorModalOpen(true);
        handleLogin(false);
      }
    } catch (error) {
      setErrors('이메일이나 비밀번호가 틀렸습니다.');
      setIsErrorModalOpen(true);
      console.error('Error:', error);
    }
  }
  const closeModal = () => {
    setIsErrorModalOpen(false);
  };
  return (
      <div className='login-form-container'>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            {/* Username Input */}
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Password Input */}
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Email Login Button */}
            <button type="submit">이메일 로그인</button>
            

            {/* Forget Password and Sign-Up Links */}
            <div className="forgetPassword">
              <Link to="/auth/forgetpassword" id="forgot-password-link"> 비밀번호 찾기 |</Link>
              <Link to="/auth/signup" id="sign-up-link"> 회원가입</Link>
            </div>

            {/* Social Media Login Buttons */}
            <div className="authorityLogin">
              <div className="naverLogin">
                <button type="button" id="naver-login">
                  <Link to="/naver-login"><img src="/Photo/naverLogin.png" alt="naver login" /></Link>
                </button>
              </div>

              <div className="appleLogin">
                <button type="button" id="apple-login">
                  <Link to="/apple-login"><IoLogoApple size={22} className="white-icon" /></Link>Apple로 로그인
                </button>
              </div>

              <div className="kakaoLogin">
                <button type="button" id="kakao-login">
                  <Link to="/kakao-login"><img src="/Photo/kakaoLogin.png" alt="kakao login" /></Link>
                </button>
              </div>
            </div>
          </form>
          {/* Error Modal */}
          <ReactModal
            isOpen={isErrorModalOpen}
            contentLabel="Error Modal"
            className="error-modal"
            ariaHideApp={false}
          >
            <div>
              <p>{error}</p>
              <button onClick={closeModal}className="button-close">닫기</button>
            </div>
          </ReactModal>
        </div>
      </div>
  );
}

export default LoginPage;

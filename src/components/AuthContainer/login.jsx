import { useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/login.css";
import { IoLogoApple } from "react-icons/io5";
import { publicPath } from "../../App";
import { axiosRegularInstance } from "../../hooks/axiosInstance";
import { useAuth } from "../../context/authContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginFunction } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosRegularInstance.post(
        "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Response:", response);
      if (response.status === 200 && response.data.success) {
        alert("Login successful!");
        loginFunction();
        window.location.href = "/";
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <div className="login-form-container">
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
              <Link to="/auth/forgetpassword" id="forgot-password-link">
                {" "}
                비밀번호 찾기 |
              </Link>
              <Link to="/auth/signup" id="sign-up-link">
                {" "}
                회원가입
              </Link>
            </div>

            {/* Social Media Login Buttons */}
            <div className="authorityLogin">
              <div className="naverLogin">
                <button type="button" id="naver-login">
                  <Link to="/naver-login">
                    <img
                      src={publicPath("Photo/naverLogin.png")}
                      alt="naver login"
                    />
                  </Link>
                </button>
              </div>

              <div className="appleLogin">
                <button type="button" id="apple-login">
                  <Link to="/apple-login">
                    <IoLogoApple size={22} className="white-icon" />
                  </Link>
                  Apple로 로그인
                </button>
              </div>

              <div className="kakaoLogin">
                <button type="button" id="kakao-login">
                  <Link to="/kakao-login">
                    <img
                      src={publicPath("Photo/kakaoLogin.png")}
                      alt="kakao login"
                    />
                  </Link>
                </button>
              </div>
            </div>
          </form>
          {/* Error Modal */}
        </div>
      </div>
    </>
  );
}

export default LoginPage;

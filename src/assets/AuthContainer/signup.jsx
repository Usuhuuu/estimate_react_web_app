import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../CSS/signup.css";
const urlApi = "https://hiwoorizip-ff4cfc190fb7.herokuapp.com";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    agree_terms: false,
    agree_privacy: false,
    is_adult: false,
    role: "user",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [verificationNumber, setVerificationNumber] = useState("");
  const [timer, setTimer] = useState(600);
  const [showVerificationInput, setShowVerificationInput] = useState(false);

  const [phoneNumberDisabled, setPhoneNumberDisabled] = useState(false);
  const [sendSMSButtonDisabled, setSendSMSButtonDisabled] = useState(false);
  const [verificationCompleted, setVerificationCompleted] = useState(false);

  const handleChange = (e) => {
    const { name, checked, type, value } = e.target;

    if (type === "checkbox") {
      if (name === "check-all") {
        setFormData({
          ...formData,
          agree_terms: checked,
          agree_privacy: checked,
          is_adult: checked,
        });
      } else {
        setFormData({
          ...formData,
          [name]: checked,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    const allCheckbox = document.querySelector(".check-all");
    const individualCheckboxes = document.querySelectorAll(
      'input[name^="agree_"]'
    );

    if (allCheckbox) {
      allCheckbox.addEventListener("change", function () {
        const isChecked = this.checked;
        individualCheckboxes.forEach((checkbox) => {
          checkbox.checked = isChecked;
        });
      });
    }

    individualCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        const allChecked = Array.from(individualCheckboxes).every(
          (cb) => cb.checked
        );
        allCheckbox.checked = allChecked;
      });
    });

    return () => {
      // Cleanup (remove event listeners, if necessary)
      if (allCheckbox) {
        allCheckbox.removeEventListener("change", () => {});
      }
      individualCheckboxes.forEach((checkbox) => {
        checkbox.removeEventListener("change", () => {});
      });
    };
  }, []);

  const startTimer = () => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Clear the interval when the timer reaches 0
    setTimeout(() => {
      clearInterval(intervalId);
    }, timer * 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      if (verificationCompleted) {
        const response = await axios.post(`${urlApi}/auth/signup`, formData);
        setSuccessMessage(response.data.message);
        setErrorMessage("");
        window.location.href = "/auth/login";
      } else {
        alert("핸드폰 인증해 주세요");
      }
    } catch (error) {
      setSuccessMessage("");
      alert("Failed to sign up. Please try again. sda");
    }
  };

  const handleSendSMS = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Send a request to your backend to generate and send the verification code
    try {
      const response = await axios.post(`${urlApi}/auth/prosignup/sendSMS`, {
        phoneNumber: formData.phoneNumber,
      });

      if (response.data.success) {
        // Verification code sent successfully
        setErrorMessage("");
        setTimer(600);
        startTimer();
        setShowVerificationInput(true);
      } else {
        // Failed to send verification code
        alert("Failed to send verification code. Please try again.");
      }
    } catch (error) {
      console.error("Error sending SMS:", error);
      alert("Failed to send verification code. Please try again.");
    }
  };
  const verifySMSCode = async () => {
    try {
      const response = await axios.post(`${urlApi}/auth/prosignup/verifySMS`, {
        phoneNumber: formData.phoneNumber,
        verificationNumber,
      });

      if (response.data.success) {
        // Verification successful, proceed with user registration
        setPhoneNumberDisabled(true);
        setSendSMSButtonDisabled(true);
        setVerificationCompleted(true);
        alert("인증완료");
        return true;
      } else {
        // Verification failed
        setErrorMessage("Invalid verification code");
        alert(errorMessage);
        return false;
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to verify SMS code. Please try again.");
      alert(errorMessage);
      return false;
    }
  };
  return (
    <div className="Container">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form id="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">핸드폰 번호</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        {!showVerificationInput ? (
          <div className="phoneNumberFirst">
            <button className="phoneNumberButtonFirst" onClick={handleSendSMS}>
              인증하기
            </button>
          </div>
        ) : (
          <div className="verificationNumber-container">
            <label htmlFor="verificationNumber">인증번호</label>
            <input
              type="verificationNumber"
              id="verificationNumber"
              name="verificationNumber"
              value={verificationNumber}
              onChange={(e) => setVerificationNumber(e.target.value)}
              required
              disabled={phoneNumberDisabled}
              placeholder="인증번호 입력하기"
            />
            <button
              className="phoneNumberButton"
              onClick={verifySMSCode}
              disabled={sendSMSButtonDisabled}
            >
              {verificationCompleted ? "인증완료" : "인증하기"}
            </button>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm_password">비밀번호 확인</label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </div>
        <div className="checkbox">
          <label className="allCheckbox">
            <input
              type="checkbox"
              name="check-all"
              className="check-all"
              onChange={handleChange}
            />
            전체동의
          </label>
          <hr />
          <label>
            <input
              type="checkbox"
              name="agree_terms"
              className="check"
              checked={formData.agree_terms}
              onChange={handleChange}
            />
            이용약관 동의 (필수)
          </label>
          <Link to="#">
            <button className="보기">보기</button>
          </Link>
          <label>
            <input
              type="checkbox"
              name="agree_privacy"
              className="check"
              checked={formData.agree_privacy}
              onChange={handleChange}
            />
            개인정보 수집 및 이용 동의 (필수)
          </label>
          <Link to="#">
            <button className="보기">보기</button>
          </Link>
          <label>
            <input
              type="checkbox"
              name="is_adult"
              className="check"
              checked={formData.is_adult}
              onChange={handleChange}
            />
            14세 이상입니다 (필수)
          </label>
        </div>
        <div className="form-group">
          {/* Additional form groups can be added here if needed */}
        </div>
        <div className="form-group">
          <button type="submit" onClick={handleSubmit}>
            가입하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;

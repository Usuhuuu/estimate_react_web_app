import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../CSS/signup.css";
import Select from "react-select";

const urlApi = "https://hiwoorizip-ff4cfc190fb7.herokuapp.com";

const ProSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    address: "",
    email: "",
    password: "",
    phoneNumber: "",
    profession: "",
    agree_terms: false,
    agree_privacy: false,
    is_adult: false,
  });
  const [clickedButton, setClickedButton] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [verificationNumber, setVerificationNumber] = useState("");
  const [timer, setTimer] = useState(600);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [phoneNumberDisabled, setPhoneNumberDisabled] = useState(false);
  const [sendSMSButtonDisabled, setSendSMSButtonDisabled] = useState(false);
  const [verificationCompleted, setVerificationCompleted] = useState(false);
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleGenderClick = (selectedGender) => {
    setFormData({
      ...formData,
      gender: selectedGender,
    });
    setClickedButton(selectedGender);
  };
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
  const handleProSignup = async (e) => {
    e.preventDefault();
    saveAddressString();
    if (formData.password !== formData.confirm_password) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      if (verificationCompleted && buttonClicked === true) {
        const registerResponse = await axios.post(
          `${urlApi}/auth/prosignup`,
          formData
        );
        setSuccessMessage(registerResponse.data.message);
        setErrorMessage("");
        window.location.href = "/auth/login";
      } else if (!verificationCompleted) {
        alert("핸드폰 인증해 주세요");
      } else if (buttonClicked === false) {
        alert("주소 입력하세요");
      } else {
        alert("서버 문제가 생겼습나다.");
      }
    } catch (error) {
      setSuccessMessage("");
      alert("Failed to sign up. Please try again. sda");
    }
  };
  const getButtonColor = (buttonId) => {
    return clickedButton === buttonId ? "#755dc9" : "";
  };
  const verifySMSCode = async () => {
    try {
      const response = await axios.post(`${urlApi}/auth/prosignup/verifySMS`, {
        phoneNumber: formData.phoneNumber,
        verificationNumber,
      });
      console.log("Verification Response:", response.data);
      if (response.data.success) {
        setPhoneNumberDisabled(true);
        setSendSMSButtonDisabled(true);
        setVerificationCompleted(true);
        alert("인증완료");
        clearInterval(timer);
        return true;
      } else {
        alert("Invalid verification code");
        return false;
      }
    } catch (error) {
      console.error(error);
      alert("Failed to verify SMS code. Please try again.");
      return false;
    }
  };
  const handleSendSMS = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${urlApi}/auth/prosignup/sendSMS`, {
        phoneNumber: formData.phoneNumber,
      });
      if (response.data.success) {
        setErrorMessage("");
        // setTimer(600);
        // startTimer();
        setShowVerificationInput(true);
      } else {
        alert("Failed to send verification code. Please try again.");
      }
    } catch (error) {
      console.error("Error sending SMS:", error);
      alert("Failed to send verification code. Please try again.");
    }
  };
  const startTimer = () => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(intervalId);
    }, timer * 1000);
  };
  useEffect(() => {
    const allCheckbox = document.querySelector(".check-all");
    const individualCheckboxes = document.querySelectorAll(
      'input[name^="agree_"]'
    );
    if (allCheckbox) {
      allCheckbox.addEventListener("change", function () {
        const inChecked = this.checked;
        individualCheckboxes.forEach((checkbox) => {
          checkbox.checked = inChecked;
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
      if (allCheckbox) {
        allCheckbox.removeEventListener("change", () => {});
      }
      individualCheckboxes.forEach((checkbox) => {
        checkbox.removeEventListener("change", () => {});
      });
    };
  }, []);

  const handleProfessionChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData({
      ...formData,
      profession: selectedValues,
    });
  };
  const myData = [
    {
      label: "종합인테리어",
      options: [{ label: "종합인테리어", value: "종합인테리어" }],
    },
    {
      label: "부분인테리어",
      options: [
        { label: "주방", value: "주방" },
        { label: "도배", value: "도배" },
      ],
    },
    {
      label: "수리",
      options: [
        { label: "상수도", value: "상수도" },
        { label: "하수도", value: "하수도" },
        { label: "욕실", value: "욕실" },
      ],
    },
    {
      label: "청소",
      options: [
        { label: "청소", value: "청소" },
        { label: "에어컨", value: "에어컨" },
      ],
    },
    {
      label: "방수 누수",
      options: [
        { label: "방수", value: "방수" },
        { label: "누수", value: "누수" },
      ],
    },
  ];
  const addresses = [
    {
      val: 0,
      label: "서울",
      value: "서울",
      items: [
        { parentVal: 0, label: "강남구", value: "강남구" },
        { parentVal: 0, label: "강동구", value: "강동구" },
        { parentVal: 0, label: "강북구", value: "강북구" },
        { parentVal: 0, label: "강서구", value: "강서구" },
        { parentVal: 0, label: "관악구", value: "관악구" },
        { parentVal: 0, label: "광진구", value: "광진구" },
        { parentVal: 0, label: "구로구", value: "구로구" },
        { parentVal: 0, label: "금천구", value: "금천구" },
        { parentVal: 0, label: "노원구", value: "노원구" },
        { parentVal: 0, label: "도봉구", value: "도봉구" },
        { parentVal: 0, label: "동대문구", value: "동대문구" },
        { parentVal: 0, label: "동작구", value: "동작구" },
        { parentVal: 0, label: "마포구", value: "마포구" },
        { parentVal: 0, label: "서대문구", value: "서대문구" },
        { parentVal: 0, label: "서초구", value: "서초구" },
        { parentVal: 0, label: "성동구", value: "성동구" },
        { parentVal: 0, label: "성북구", value: "성북구" },
        { parentVal: 0, label: "송파구", value: "송파구" },
        { parentVal: 0, label: "양천구", value: "양천구" },
        { parentVal: 0, label: "영등포구", value: "영등포구" },
        { parentVal: 0, label: "용산구", value: "용산구" },
        { parentVal: 0, label: "은평구", value: "은평구" },
        { parentVal: 0, label: "종로구", value: "종로구" },
        { parentVal: 0, label: "중구", value: "중구" },
        { parentVal: 0, label: "중랑구", value: "중랑구" },
      ],
    },
    {
      val: 1,
      label: "인천",
      value: "인천",
      items: [
        { parentVal: 1, label: "강화군", value: "강화군" },
        { parentVal: 1, label: "계양구", value: "계양구" },
        { parentVal: 1, label: "남동구", value: "남동구" },
        { parentVal: 1, label: "동구", value: "동구" },
        { parentVal: 1, label: "미추홀구", value: "미추홀구" },
        { parentVal: 1, label: "부평구", value: "부평구" },
        { parentVal: 1, label: "서구", value: "서구" },
        { parentVal: 1, label: "연수구", value: "연수구" },
        { parentVal: 1, label: "옹진군", value: "옹진군" },
      ],
    },
    {
      val: 2,
      label: "경기",
      value: "경기",
      items: [
        { parentVal: 2, label: "가평군", value: "가평군" },
        { parentVal: 2, label: "고양시", value: "고양시" },
        { parentVal: 2, label: "과천시", value: "과천시" },
        { parentVal: 2, label: "광명시", value: "광명시" },
        { parentVal: 2, label: "광주시", value: "광주시" },
        { parentVal: 2, label: "구리시", value: "구리시" },
        { parentVal: 2, label: "군포시", value: "군포시" },
        { parentVal: 2, label: "김포시", value: "김포시" },
        { parentVal: 2, label: "남양주시", value: "남양주시" },
        { parentVal: 2, label: "동두천시", value: "동두천시" },
        { parentVal: 2, label: "부천시", value: "부천시" },
        { parentVal: 2, label: "성남시", value: "성남시" },
        { parentVal: 2, label: "수원시", value: "수원시" },
        { parentVal: 2, label: "시흥시", value: "시흥시" },
        { parentVal: 2, label: "안산시", value: "안산시" },
        { parentVal: 2, label: "안성시", value: "안성시" },
        { parentVal: 2, label: "안양시", value: "안양시" },
        { parentVal: 2, label: "양주시", value: "양주시" },
        { parentVal: 2, label: "양평군", value: "양평군" },
        { parentVal: 2, label: "여주시", value: "여주시" },
        { parentVal: 2, label: "연천군", value: "연천군" },
        { parentVal: 2, label: "오산시", value: "오산시" },
        { parentVal: 2, label: "용인시", value: "용인시" },
        { parentVal: 2, label: "의왕시", value: "의왕시" },
        { parentVal: 2, label: "의정부시", value: "의정부시" },
        { parentVal: 2, label: "이천시", value: "이천시" },
        { parentVal: 2, label: "파주시", value: "파주시" },
        { parentVal: 2, label: "평택시", value: "평택시" },
        { parentVal: 2, label: "포천시", value: "포천시" },
        { parentVal: 2, label: "하남시", value: "하남시" },
        { parentVal: 2, label: "화성시", value: "화성시" },
      ],
    },
  ];

  const handleCityChange = (selectedOption) => {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        city: selectedOption,
        district: null, // Reset district when city changes
      },
    });
  };
  const handleDistrictChange = (selectedOption) => {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        district: selectedOption,
      },
    });
  };
  const getAddressString = () => {
    const cityLabel = formData.address.city?.label || "";
    const districtLabel = formData.address.district?.label || "";
    return cityLabel + " " + districtLabel;
  };

  const saveAddressString = () => {
    const addressString = getAddressString();
    setButtonClicked(true);
    setFormData({
      ...formData,
      address: addressString,
    });
  };

  return (
    <div className="proUserContainer">
      <div className="Container">
        <form id="sign-form" onSubmit={handleProSignup}>
          <div className="form-group">
            <label htmlFor="name">이름</label>
            <input
              type="name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <Select
              name="proJobs"
              id="proJobs"
              onChange={handleProfessionChange}
              value={myData.flatMap((group) =>
                group.options.filter((option) =>
                  formData.profession.includes(option.value)
                )
              )}
              isMulti
              options={myData}
            />
          </div>
          <div className="form-group">
            <label>성별</label>
            <div className="gender">
              <button
                id="genderMale"
                value="male"
                onClick={() => handleGenderClick("male")}
                style={{ backgroundColor: getButtonColor("male") }}
                onChange={handleChange}
                required
              >
                남성
              </button>
              <button
                id="genderFemale"
                value="female"
                onClick={() => handleGenderClick("female")}
                style={{ backgroundColor: getButtonColor("female") }}
                onChange={handleChange}
                required
              >
                여성
              </button>
            </div>
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
              <button
                className="phoneNumberButtonFirst"
                onClick={handleSendSMS}
              >
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
          <div className="App">
            <div>
              <Select
                name="city"
                id="city"
                onChange={handleCityChange}
                value={formData.address.city}
                placeholder="주소 선택하세요"
                options={addresses.map((group) => ({
                  value: group.val,
                  label: group.label,
                }))}
              />
            </div>
            {formData.address.city && (
              <div>
                <Select
                  name="city"
                  id="city"
                  onChange={handleDistrictChange}
                  value={formData.address.district}
                  placeholder="주소 선택하세요"
                  options={addresses
                    .find((group) => group.val === formData.address.city.value)
                    .items.map((district) => ({
                      value: district.value,
                      label: district.label,
                    }))}
                />
              </div>
            )}
            {buttonClicked === false ? (
              <button type="button" onClick={saveAddressString}>
                주소 제출하기
              </button>
            ) : (
              <button type="button" onClick={saveAddressString}>
                완료했습니나.
              </button>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">매일</label>
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
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm_password">비밀번호 확인</label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              onChange={handleChange}
              required
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
            <button type="submit" onClick={handleProSignup}>
              이메일 로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProSignup;

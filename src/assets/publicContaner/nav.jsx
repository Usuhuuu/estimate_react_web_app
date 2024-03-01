import "../CSS/style.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "axios";
import Loading from "../loader/loading";
import RotateLoader from "react-spinners/RotateLoader";

const urlApi = "https://hiwoorizip-ff4cfc190fb7.herokuapp.com";

const NavigationBar = () => {
  const [loggedInStatus, setLoggedInStatus] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [subNavVisibility, setSubNavVisibility] = useState({
    interior: false,
    repair: false,
    cleaning: false,
    waterproof: false,
  });
  const [searchValue, setSearchValue] = useState("");
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const checkAuthentication = async () => {
    try {
      let authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setLoading(true);
        const response = await axios.post(
          `${urlApi}/auth/refresh-token`,
          {},
          {
            withCredentials: true,
            headers: {
              "X-Requested-With": "XMLHttpRequest",
            },
          }
        );

        const { auth, accessToken } = response.data;
        if (!auth || !accessToken) {
          setLoggedInStatus(false);
          setLoading(false);
          return;
        }
        localStorage.setItem("authToken", accessToken);
        delete axios.defaults.headers.common["Authorization"];
        axios.defaults.headers.common["Authorization"] = `${accessToken}`;
        setLoggedInStatus(true);
        setSuccessMessage("Authentication successful with a new access token!");
        setLoading(false);
      } else {
        const response = await axios.get(`${urlApi}/auth/dashboard`, {
          headers: {
            Authorization: authToken,
          },
        });
        setDashboardData(response.data);
        setSuccessMessage("Data retrieved successfully!");
        setLoggedInStatus(true);
        setLoading(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("authToken");
        setLoggedInStatus(false);
      } else {
        setErrors("Error setting up the request");
        setLoggedInStatus(false);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkAuthentication();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  if (loading) {
    return (
      <div className="loadingOverlay">
        <p style={{ padding: 15, font: 15 }}>잠시만 기다려 주세요</p>
        <RotateLoader
          loading={loading}
          color="#0056b3"
          size={20}
          className="loadingAnime"
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const handleClear = () => {
    setSearchValue("");
  };
  const handleMouseEnter = (category) => {
    setSubNavVisibility((prevState) => ({
      ...prevState,
      [category]: true,
    }));
  };
  const handleMouseLeave = (category) => {
    setSubNavVisibility((prevState) => ({
      ...prevState,
      [category]: false,
    }));
  };
  const handleLogoutClick = async () => {
    try {
      const response = await axios.post(
        `${urlApi}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      localStorage.removeItem("authToken");
      if (response.status === 200) {
        setLoggedInStatus(false);
        alert("Successfully logged out!");
        window.location.reload();
      } else {
        setLoggedInStatus(true);
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Error during logout. Please try again.");
    }
  };

  return (
    <>
      <nav>
        <button className="Logobutton">
          <Link to="/">
            <img src="/logo2.png" alt="Logo" />
          </Link>
        </button>
        <div className={`navContainer ${isMenuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <Link to="/interior" className="navMenu">
                종합인테리어
              </Link>
            </li>
            <li>
              <Link
                to="/partInterior"
                className="navMenu"
                onMouseEnter={() => handleMouseEnter("interior")}
                onMouseLeave={() => handleMouseLeave("interior")}
              >
                부분인테리어
                <ArrowDropDownIcon className="arrowDown" />
              </Link>
              <div
                className={
                  subNavVisibility.interior
                    ? "dropdown-content actives"
                    : "dropdown-content"
                }
              >
                {/* <ul className="hudsda">
                  <li>
                    <Link to="/interior/kitchen">주방</Link>
                  </li>
                  <li>
                    <Link to="/interior/floorAndWall">도배</Link>
                  </li>
                </ul> */}
              </div>
            </li>
            <li>
              <Link
                to="/repair"
                className="navMenu"
                onMouseEnter={() => handleMouseEnter("repair")}
                onMouseLeave={() => handleMouseLeave("repair")}
              >
                설비/수리
                <ArrowDropDownIcon className="arrowDown" />
              </Link>
              <div
                className={
                  subNavVisibility.repair
                    ? "dropdown-content active"
                    : "dropdown-content"
                }
              >
                {/* <ul>
                  <li>
                    <Link to="/repair/waterwork">상수도</Link>
                  </li>
                  <li>
                    <Link to="/repair/sewer">하수도</Link>
                  </li>
                  <li>
                    <Link to="/repair/bathroom">욕실</Link>
                  </li>
                </ul> */}
              </div>
            </li>
            <li>
              <Link to="/checkwaterproof" className="navMenu">
                누수/방수
              </Link>
            </li>
            <li>
              <Link to="/cleaning" className="navMenu">
                청소
              </Link>
              {/* <div className={
                subNavVisibility.cleaning
                  ? 'dropdown-content active'
                  : 'dropdown-content'}>
              <ul>
                <li><Link to="/sub/building">집청소</Link></li>
                <li><Link to="/sub/building">건물</Link></li>
                <li><Link to="/sub/aircondition">에어컨</Link></li>
              </ul>
            </div> */}
            </li>

            {/* <hr className="herrgui" /> */}
            {/* <li>
              <div className="search">
                <input type="text"placeholder="Search"value={searchValue}onChange={handleSearch}/>
                <div className="symbol">
                  <FontAwesomeIcon icon={faSearch} className="faIcon" />
                </div>
                </div>
            </li>  */}
            {loggedInStatus === true ? (
              <li>
                <div className="LoginContainer">
                  <Link to="/user/usersettings" className="navMenu" id="Engiin">
                    마이페이지
                  </Link>
                  <Link
                    to="#"
                    className="navMenu"
                    onClick={handleLogoutClick}
                    id="Engiin"
                  >
                    로그아웃
                  </Link>
                </div>
              </li>
            ) : (
              <li>
                <div className="LoginContainer">
                  <Link to="/auth/login" className="navMenu" id="Engiin">
                    로그인
                  </Link>
                  <Link to="/auth/signup" className="navMenu" id="Engiin">
                    회원가입
                  </Link>
                  <Link
                    to="/auth/prosignup"
                    className="proUserDesign"
                    id="proUserDesign"
                  >
                    협력업체
                  </Link>
                </div>
              </li>
            )}
          </ul>
        </div>
        <div className={`menu-toggle ${isMenuOpen ? "active" : ""}`}>
          <label htmlFor="menu-btn" className="menu-btn" onClick={toggleMenu}>
            <span className="material-symbols-outlined">
              <MenuIcon />
            </span>
          </label>
        </div>
        <hr />
      </nav>
    </>
  );
};
export default NavigationBar;

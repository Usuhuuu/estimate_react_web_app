import "../CSS/style.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RotateLoader from "react-spinners/RotateLoader";
import { publicPath } from "../../App";
import { auth_useSWR } from "../../hooks/use_swr_instance";
import { useAuth } from "../../context/authContext";
import { axiosInstance } from "../../hooks/axiosInstance";

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
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { LoginStatus, logoutFunction } = useAuth();
  const { data, error, isLoading } = auth_useSWR({
    path: "/auth/profile-main",
    cacheKey: "Profile_main",
    LoginStatus: LoginStatus,
  });

  useEffect(() => {
    if (data) {
      setDashboardData(data);
      setLoading(false);
    } else if (error) {
      setLoading(false);
    }
  }, [data, error]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
      const response = await axiosInstance.post("/logout", {
        withCredentials: true,
      });
      if (response.status === 200) {
        alert("Successfully logged out!");
        window.location.reload();
        logoutFunction();
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Error during logout. Please try again.");
    }
  };
  return (
    <>
      {loading ? (
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
      ) : (
        <nav>
          <button className="Logobutton">
            <Link to="/">
              <img src={publicPath("logo2.png")} alt="Logo" />
            </Link>
          </button>
          <div className={`navContainer ${isMenuOpen ? "active" : ""}`}>
            <ul>
              <li>
                <Link to="/public/interior" className="navMenu">
                  종합인테리어
                </Link>
              </li>
              <li>
                <Link
                  to="/public/part-interior"
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
                  to="/public/repair"
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
                <Link to="/public/checkwaterproof" className="navMenu">
                  누수/방수
                </Link>
              </li>
              <li>
                <Link to="/public/estimate/clean" className="navMenu">
                  청소
                </Link>
              </li>
              {LoginStatus ? (
                <li>
                  <div className="LoginContainer">
                    <Link
                      to="/user/usersettings"
                      className="navMenu"
                      id="Engiin"
                    >
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
      )}
    </>
  );
};
export default NavigationBar;

import "../CSS/footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faBlogger,
} from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer__addr">
          <h1 className="footer__logo">Hi우리집</h1>
          <h2></h2>
          <address>
            주소 : **** | 연락처 : 02-1234-5678
            <a className="footer__btn" href="mailto:example@gmail.com">
              Email Us
            </a>
            <div className="icon_container">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} className="allIcons" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} className="allIcons" />
              </a>
              <a
                href="https://www.exampleblog.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faBlogger} className="allIcons" />
              </a>
            </div>
          </address>
        </div>
        <div></div>
        <ul className="footer__nav">
          <li className="nav__item">
            <h2 className="nav__title">회사</h2>
            <ul className="nav__ul">
              <li>
                <a href="/businessIntro">회사소개</a>
              </li>

              <li>
                <a href="#">블로그</a>
              </li>
            </ul>
          </li>

          <li className="nav__item">
            <h2 className="nav__title">협력업체</h2>
            <ul className="nav__ul">
              <li>
                <a href="/auth/prosignup">협력업체 가입</a>
              </li>

              <li></li>
            </ul>
          </li>
          <li className="nav__item">
            <h2 className="nav__title">도움</h2>
            <ul className="nav__ul">
              <li>
                <a href="#">고객센터</a>
              </li>
              <li>
                <a href="/agreeterm">이용약관</a>
              </li>
              <li>
                <a href="/privateagree">개인정보처리방첨</a>
              </li>
            </ul>
          </li>
          <div className="app-buttons">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                className="Zurags"
                src="/Photo/Download_on_the_App_Store_Badge_KR_RGB_blk_100317.svg"
                alt=""
              />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                className="Zurags"
                src="/Photo/google-play-badge.svg"
                alt=""
              />
            </a>
          </div>
        </ul>
      </footer>
    </>
  );
};

export default Footer;

import "./css/styleOfMain.css";
import NavigationBar from "../nav";
import "./css/styleOfMain.css";
import { Link } from "react-router-dom";
import "./css/smallDesign.css";
import Artic from "../article";
import Footer from "../footer";

const urlApi = "https://hiwoorizip-ff4cfc190fb7.herokuapp.com";
const CheckWaterproof = () => {
  return (
    <>
      <NavigationBar />
      <div className="bugdinTsagaan">
        <div className="imageContainers">
          <div className="imageChange">
            <div className="imagesss">
              <Link to="/waterproof" className="image-link">
                <img src="/Photo/waterproof.jpg" alt="" />
                <p>방수</p>
              </Link>
            </div>
            <div className="imagesss">
              <Link to="/waterproof/waterLeak" className="image-link">
                <img src="/Photo/leaking.jpg" alt="" />
                <p>누수</p>
              </Link>
            </div>
          </div>
        </div>
        <Artic />
      </div>
      <Footer />
    </>
  );
};
export default CheckWaterproof;

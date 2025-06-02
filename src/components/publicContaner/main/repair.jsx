import NavigationBar from "../nav";
import { Link } from "react-router-dom";
import "./css/newDesign.css";
import Artic from "../article";
import Footer from "../footer";
import { publicPath } from "../../../App";

const Repair = () => {
  return (
    <>
      <NavigationBar />
      <div className="bugdinTsagaan">
        <div className="imageContainer">
          <div className="imageChang">
            <div className="zurags">
              <Link to="/public/repair/waterwork" className="image-link">
                <img src={publicPath("Photo/상수도.jpg")} alt="" />
                <p>상수도</p>
              </Link>
            </div>
            <div className="zurags">
              <Link to="/public/repair/sewer" className="image-link">
                <img src={publicPath("Photo/sewer.jpg")} alt="" />
                <p>하수도</p>
              </Link>
            </div>
            <div className="zurags">
              <Link to="/public/repair/bathroom" className="image-link">
                <img src={publicPath("Photo/욕실.jpg")} alt="" />
                <p>욕실</p>
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
export default Repair;

import NavigationBar from "../nav";
import { Link } from "react-router-dom";
import "./css/smallDesign.css";
import Artic from "../article";
import Footer from "../footer";
import { publicPath } from "../../../App";

const PartInterior = () => {
  return (
    <div className="bugdinTsagaan">
      <NavigationBar />
      <div className="imageContainers">
        <div className="imageChange">
          <div className="imagesss">
            <Link to="/public/estimate/kitchen" className="image-link">
              <img src={publicPath("Photo/kitchen.jpg")} alt="" />
              <p>주방</p>
            </Link>
          </div>
          <div className="imagesss">
            <Link to="/public/estimate/wall_paper" className="image-link">
              <img src={publicPath("Photo/wall.jpg")} alt="" />
              <p>도배</p>
            </Link>
          </div>
        </div>
      </div>
      <Artic />
      <Footer />
    </div>
  );
};
export default PartInterior;

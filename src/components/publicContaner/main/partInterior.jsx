import NavigationBar from "../nav";
import { Link } from "react-router-dom";
import "./css/smallDesign.css";
const urlApi = "https://hiwoorizip-ff4cfc190fb7.herokuapp.com";
import Artic from "../article";
import Footer from "../footer";
import { publicPath } from "../../../App";
import { useParams } from "react-router-dom";

const PartInterior = () => {
  const { type } = useParams();
  return (
    <>
      <NavigationBar />
      <div>
        <div className="bugdinTsagaan">
          <div className="imageContainers">
            <div className="imageChange">
              <div className="imagesss">
                <Link to="/public/part-interior/kitchen" className="image-link">
                  <img src={publicPath("Photo/kitchen.jpg")} alt="" />
                  <p>주방</p>
                </Link>
              </div>
              <div className="imagesss">
                <Link
                  to="/public/part-interior/floorAndWall"
                  className="image-link"
                >
                  <img src={publicPath("Photo/wall.jpg")} alt="" />
                  <p>도배</p>
                </Link>
              </div>
            </div>
          </div>
          <Artic />
          <Footer />
        </div>
      </div>
    </>
  );
};
export default PartInterior;

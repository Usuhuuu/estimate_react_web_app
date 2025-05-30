import React from "react";
import NavigationBar from "./nav";
import Sect from "./section";
import Artic from "./article";
import "../CSS/style.css";
import Footer from "./footer";

// import Footer from "./footer"
const Home = () => {
  return (
    <div>
      <NavigationBar />
      <Sect />
      <Artic />
      <Footer />
    </div>
  );
};

const style = {
  Allcontainer: {},
};

export default Home;

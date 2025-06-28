import React, { useState, useEffect } from "react";
import NavigationBar from "../publicContaner/nav";

// import {Routes, Route} from "react-router-dom";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleLogoutClick = () => {
    handleLogout();
    console.log("successfully login outed!");
  };

  console.log("Dashboard rendering, isLoggedIn:", isLoggedIn);
  return (
    <>
      <NavigationBar isLoggedIn={isLoggedIn} handleLogout={handleLogoutClick} />

      {/* <Routes>
        <Route exact path="" element={}/>
         <Route exact path="" element={}/>
         <Route exact path="" element={}/>
      </Routes> */}
      {successMessage && <p>Success: {successMessage}</p>}
      {error && <p>Error: {error}</p>}
    </>
  );
};

export default Dashboard;

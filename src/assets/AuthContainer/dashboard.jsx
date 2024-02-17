import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "../publicContaner/nav";

// import {Routes, Route} from "react-router-dom";

const Dashboard = ({ isLoggedIn, handleLogout }) => {
 const [dashboardData, setDashboardData] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleLogoutClick = () => {
    handleLogout(); 
    console.log("successfully login outed!");
    
  };

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (isLoggedIn && token) {
  //     axios.get('/auth/dashboard', {
  //       headers: {
  //         'x-access-token': token,
  //       },
  //     })
  //     .then((response) => {
  //       setDashboardData(response.data);
  //       setSuccessMessage('Data retrieved successfully!');
  //     })
  //     .catch((error) => {
  //       // Handle error (e.g., unauthorized access, server errors)
  //       console.error('Error fetching dashboard data:', error);
  //       if (error.response) {
  //         setError(error.response.data.message); 
  //       } else if (error.request) {
  //         setError('Request made but no response received');
  //       } else {
  //         setError('Error setting up the request');
  //       }
  //     });
  //   }
  // }, [isLoggedIn, handleLogout]);

  console.log('Dashboard rendering, isLoggedIn:', isLoggedIn);
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
}

export default Dashboard;

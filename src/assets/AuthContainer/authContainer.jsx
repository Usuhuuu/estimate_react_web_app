import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// PAGES
import LoginPage from "./login";
import Signup from "./signup";
import Dashboard from "./dashboard";
import axios from "axios";
import ProSignup from "./proSignup";

const urlApi = "http://localhost:3001";

const AuthContainer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming token is stored in local storage
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []); // Empty dependency array to run this effect only once when the component mounts
  const handleLogin = (status) => {
    if (status === true) {
      setIsLoggedIn(true);
      // Optionally redirect after login
      window.location.href = "/";
      // Check user authentication
      axios
        .get(`${urlApi}/auth/dashboard`, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response.data.authenticated) {
            setIsLoggedIn(true); // Authenticated, set isLoggedIn to true

            console.log("User is authenticated");
          } else {
            setIsLoggedIn(false); // Not authenticated, set isLoggedIn to false
            console.log("User is not authenticated");
          }
        })
        .catch((error) => {
          console.error("Error checking authentication:", error);
          setIsLoggedIn(false); // Error occurred, set isLoggedIn to false
        });
    } else {
      setIsLoggedIn(false);
    }
  };

  return (
    <Routes>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<LoginPage handleLogin={handleLogin} />} />
      if (isLoggedIn === true){" "}
      {
        <Route
          path="dashboard"
          element={<Dashboard isLoggedIn={isLoggedIn} />}
        />
      }{" "}
      else {<Route path="dashboard" element={<Navigate to="/auth/login" />} />}
      <Route path="prosignup" element={<ProSignup />} />
    </Routes>
  );
};

export default AuthContainer;

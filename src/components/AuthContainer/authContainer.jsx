import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// PAGES
import LoginPage from "./login";
import Signup from "./signup";
import Dashboard from "./dashboard";
import ProSignup from "./proSignup";
import { useAuth } from "../../context/authContext";

const AuthContainer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { LoginStatus } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <Routes>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<LoginPage />} />

      {LoginStatus ? (
        <Route path="dashboard" element={<Navigate to="/auth/login" />} />
      ) : (
        <Route
          path="dashboard"
          element={<Dashboard isLoggedIn={isLoggedIn} />}
        />
      )}
      <Route path="prosignup" element={<ProSignup />} />
    </Routes>
  );
};

export default AuthContainer;

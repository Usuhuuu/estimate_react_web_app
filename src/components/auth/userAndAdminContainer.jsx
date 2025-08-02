import React, { Suspense } from "react";
import { Route, Router, Routes } from "react-router-dom";

const AdminContainer = () => {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes></Routes>
      </Suspense>
    </>
  );
};

export default AdminContainer;

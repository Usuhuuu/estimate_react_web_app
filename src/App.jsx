import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/publicContaner/home";
import AuthContainer from "./components/AuthContainer/authContainer";
import NotFound from "./components/notfound";
import AdminContainer from "./components/userAndAdmin/userAndAdminContainer";
import PublicContainer from "./components/publicContaner/publicContainer";
import "./components/CSS/style.css";

function App() {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <Router basename="/">
          <Routes>
            <Route path="/auth/*" element={<AuthContainer />} />
            <Route path="/user/*" element={<AdminContainer />} />
            <Route path="/*" element={<PublicContainer />} />
            <Route exact path="/" element={<Home />} />
            <Route path="*" component={NotFound} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;

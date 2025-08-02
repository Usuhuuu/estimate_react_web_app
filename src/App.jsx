import { Suspense } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/publicContaner/home";
import AuthContainer from "./components/AuthContainer/authContainer";
import NotFound from "./components/notfound";
import AdminContainer from "./components/auth/userAndAdminContainer";
import PublicContainer from "./components/publicContaner/publicContainer";
import "./app.css";

export const publicPath = (filePath) =>
  `${import.meta.env.BASE_URL}${filePath}`;

function App() {
  // No basename needed in HashRouter
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/*" element={<AuthContainer />} />
            <Route path="/user/*" element={<AdminContainer />} />
            <Route path="/public/*" element={<PublicContainer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;

import React, { Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './assets/publicContaner/home';
import AuthContainer from './assets/AuthContainer/authContainer';
import NotFound from './assets/notfound';
import AdminContainer from './assets/userAndAdmin/userAndAdminContainer';
import PublicContainer from './assets/publicContaner/publicContainer';
import './assets/CSS/style.css';

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

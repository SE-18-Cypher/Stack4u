import './App.css';
import Redirect from './components/presentationPage/Redirect';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TechInfoPage from './components/techInfoPage/TechInfoPage';
import Common from './components/login/common/Common';
import ForgotPassword from './components/login/signin/ForgotPassword';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Redirect />} />
          <Route path="/login" element={<Common />} />
          <Route path="/techInfoPage/TechInfoPage" element={<TechInfoPage />} />
          <Route path="/techInfoPage" element={<TechInfoPage />} />
          <Route path="ForgotPassword" element={<ForgotPassword />} />
          <Route path="login/common/Common/ForgotPassword" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

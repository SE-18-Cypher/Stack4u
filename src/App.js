import './App.css';
import Redirect from './components/presentationPage/Redirect';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TechInfoPage from './components/techInfoPage/TechInfoPage';
import Common from './components/login/common/Common';
import ForgotPassword from './components/login/signin/ForgotPassword';
import Home from './components/home/Home';
import ErrorPage from './components/error page/ErrorPage';
import Forum from './components/forum/Forum';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Redirect />} />
          <Route path="/login" element={<Common />} />
          <Route path="/techInfoPage/TechInfoPage" element={<TechInfoPage />} />
          <Route path="/techInfoPage" element={<TechInfoPage />} />
          <Route path="/login/forgotpassword" element={<ForgotPassword />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="login/common/Common/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/common" element={<Common/>}/>
          <Route path="/forum" element={<Forum/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

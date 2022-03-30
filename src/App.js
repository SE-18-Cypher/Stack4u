import './App.css';
import Redirect from './components/presentationPage/Redirect';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TechInfoPage from './components/techInfoPage/TechInfoPage';
import Common from './components/login/common/Common';
import ForgotPassword from './components/login/signin/ForgotPassword';
import CommonProfile from './components/profile/CommonProfile';
import ErrorPage from './components/errorPage/ErrorPage';
import Forum from './components/forum/Forum';
import HomePage from './components/homePage/HomePage';
import TextInputPage from './components/homePage/textInputPage/TextInputPage';
import ContactusPage from './components/contactUs/ContactusPage';
import Feedback from './components/feedback/Feedback';
import ConstructionPage from './components/constructionPage/ConstructionPage';
import AboutusPage from './components/aboutUs/AboutusPage';
import Output from './components/outputpage/output';
import TechInput from './components/userTechInput/TechInput';
import OutputPage from './components/output/OutputPage';
import Output from './components/outputpage/output';
import Questionnaire from './components/questionnaire/Questionnaire';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Redirect />} />
          <Route path="/login" element={<Common />} />
          <Route path="/contactus" element={<ContactusPage />} />
          <Route path="/manualinput" element={<TextInputPage />} />
          <Route path="/techInfoPage" element={<TechInfoPage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/common" element={<Common />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/home/profile" element={<CommonProfile />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/aboutus" element={<AboutusPage />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/techinput" element={<TechInput />} />
          <Route path="/outputpage" element={<OutputPage />} />
          <Route path="/output" element={<Output />} />
          <Route path="/constructionPage" element={<ConstructionPage />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/textInputPage" element={<TextInputPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
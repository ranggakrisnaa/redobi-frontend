import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SignInPage from './pages/auth/SignInPage';
import VerifySignInPage from './pages/auth/VerifySignInPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/verify" element={<VerifySignInPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

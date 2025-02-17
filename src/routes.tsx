import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SignInPage from './pages/auth/SignInPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" />
        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

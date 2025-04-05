import PrivateRoute from '@/middlewares/privateRoute.tsx';
import StudentDetailPage from '@/pages/student/StudentDetailPage.tsx';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SignInPage from './pages/auth/SignInPage';
import VerifySignInPage from './pages/auth/VerifySignInPage';
import HomePage from './pages/home/HomePage';
import StudentPage from './pages/student/StudentPage';

const AppRoutes = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/verify" element={<VerifySignInPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/students" element={<StudentPage />} />
          <Route path="/students/:id" element={<StudentDetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;

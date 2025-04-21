import NotFoundComponent from '@/components/commons/NotFoundComponent.tsx';
import PrivateRoute from '@/middlewares/privateRoute.tsx';
import PublicRoute from '@/middlewares/publicRoute.tsx';
import StudentCreatePage from '@/pages/student/StudentCreatePage.tsx';
import StudentDetailPage from '@/pages/student/StudentDetailPage.tsx';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SignInPage from './pages/auth/SignInPage';
import VerifySignInPage from './pages/auth/VerifySignInPage';
import HomePage from './pages/home/HomePage';
import LecturerCreatePage from './pages/lecturer/LecturerCreatePage';
import LecturerPage from './pages/lecturer/LecturerPage';
import StudentPage from './pages/student/StudentPage';
import StudentUpdatePage from './pages/student/StudentUpdatePage';

const AppRoutes = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="*" element={<NotFoundComponent />} />
        <Route element={<PublicRoute />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/verify" element={<VerifySignInPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/students" element={<StudentPage />} />
          <Route path="/students/create" element={<StudentCreatePage />} />
          <Route path="/students/:id" element={<StudentDetailPage />} />
          <Route path="/students/:id/update" element={<StudentUpdatePage />} />
          <Route path="/lecturers" element={<LecturerPage />} />
          <Route path="/lecturers/create" element={<LecturerCreatePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;

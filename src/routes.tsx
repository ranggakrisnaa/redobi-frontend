import NotFoundComponent from '@/components/commons/NotFoundComponent.tsx';
import PrivateRoute from '@/middlewares/privateRoute.tsx';
import PublicRoute from '@/middlewares/publicRoute.tsx';
import StudentCreatePage from '@/pages/student/StudentCreatePage.tsx';
import StudentDetailPage from '@/pages/student/StudentDetailPage.tsx';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AssessmentCreatePage from './pages/assessment/AsessmentCreatePage';
import AssessmentPage from './pages/assessment/AssesmentPage';
import AssessmentUpdatePage from './pages/assessment/AssessmentUpdatePage';
import SignInPage from './pages/auth/SignInPage';
import VerifySignInPage from './pages/auth/VerifySignInPage';
import CriteriaCreatePage from './pages/criteria/CriteriaCreatePage';
import CriteriaDetailPage from './pages/criteria/CriteriaDetailPage';
import CriteriaPage from './pages/criteria/CriteriaPage';
import CriteriaUpdatePage from './pages/criteria/CriteriaUpdatePage';
import HomePage from './pages/home/HomePage';
import LecturerCreatePage from './pages/lecturer/LecturerCreatePage';
import LecturerDetailPage from './pages/lecturer/LecturerDetailPage';
import LecturerPage from './pages/lecturer/LecturerPage';
import LecturerUpdatePage from './pages/lecturer/LecturerUpdatePage';
import RecommendationPage from './pages/recomendation/RecomendationPage';
import StudentPage from './pages/student/StudentPage';
import StudentUpdatePage from './pages/student/StudentUpdatePage';
import ThesisKeywordCreatePage from './pages/thesis-keyword/ThesisKeywordCreatePage';
import ThesisKeywordPage from './pages/thesis-keyword/ThesisKeywordPage';
import ThesisKeywordUpdatePage from './pages/thesis-keyword/ThesisKeywordUpdatePage';

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
          <Route path="/lecturers/:id" element={<LecturerDetailPage />} />
          <Route
            path="/lecturers/:id/update"
            element={<LecturerUpdatePage />}
          />
          <Route path="/criteria" element={<CriteriaPage />} />
          <Route path="/criteria/create" element={<CriteriaCreatePage />} />
          <Route path="/criteria/:id/update" element={<CriteriaUpdatePage />} />
          <Route path="/criteria/:id" element={<CriteriaDetailPage />} />
          <Route path="/assessments" element={<AssessmentPage />} />
          <Route
            path="/assessments/create"
            element={<AssessmentCreatePage />}
          />
          <Route
            path="/assessments/:id/update"
            element={<AssessmentUpdatePage />}
          />
          <Route path="/thesis-keywords" element={<ThesisKeywordPage />} />
          <Route
            path="/thesis-keywords/create"
            element={<ThesisKeywordCreatePage />}
          />
          <Route
            path="/thesis-keywords/:id/update"
            element={<ThesisKeywordUpdatePage />}
          />
          <Route path="/recomendations" element={<RecommendationPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;

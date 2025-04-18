import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated =
    !!localStorage.getItem('auth-token') ||
    !!sessionStorage.getItem('auth-token');

  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;

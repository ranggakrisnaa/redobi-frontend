import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const isAuthenticated =
    localStorage.getItem('auth-token') || sessionStorage.getItem('auth-token');

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;

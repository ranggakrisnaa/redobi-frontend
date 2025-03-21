import { getStoredUser } from '@/utils/storageUtil.ts';
import { Navigate, Outlet } from 'react-router-dom';

const VerifyAuthRoute = () => {
  const isLogin = getStoredUser();
  return isLogin ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default VerifyAuthRoute;

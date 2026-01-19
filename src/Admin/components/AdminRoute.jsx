import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { userAuthContext } from '../contextAPI/AuthContext';
import Preloader from './Preloader';

const AdminRoute = ({ children }) => {
  const { role, authLoading } = useContext(userAuthContext);

  if (authLoading) return <Preloader />;     // wait for role
  if (role !== "admin") return <Navigate to="/login" replace />;

  return children;
};

export default AdminRoute;

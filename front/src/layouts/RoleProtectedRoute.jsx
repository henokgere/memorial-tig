// src/layouts/RoleProtectedRoute.js
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
    // Or you could redirect to an unauthorized page
    // return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
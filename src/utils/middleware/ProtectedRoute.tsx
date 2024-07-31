import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
  element: React.ReactElement;
  restricted?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, restricted = false }) => {
  const { token, loading } = useAuth();

   if (loading) {
    return <div>Loading...</div>;
  }

  if (!token && restricted) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!token && !restricted) {
    return element;
  }

  if (token && restricted) {
    return element;
  }

  return element;
};

export default ProtectedRoute;

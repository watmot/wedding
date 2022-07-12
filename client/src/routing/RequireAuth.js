import { Navigate, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';
import { useAuth } from '../providers/AuthProvider';
import { useLayoutEffect } from 'react';

function RequireAuth({ children, admin = false }) {
  const auth = useAuth();
  const location = useLocation();

  useLayoutEffect(() => {
    auth.getUser();
  }, []);

  if (auth.isLoading) {
    return <div>Loading!</div>;
  }

  if (!auth.isLoading) {
    if (!auth.isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (admin && !auth.isAdmin) {
      return <Navigate to="/rsvp" state={{ from: location }} replace />;
    }
  }

  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.any,
  admin: PropTypes.bool
};

export default RequireAuth;

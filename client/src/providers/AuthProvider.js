import * as Api from '../utils/api';

import { createContext, useContext, useState } from 'react';

import PropTypes from 'prop-types';

const AuthContext = createContext({ user: null });

function AuthProvider({ children }) {
  const auth = provideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.any
};

function useAuth() {
  return useContext(AuthContext);
}

function provideAuth() {
  const [isLoading, setIsLoading] = useState(true); // Initialise to true for initial render
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(false);

  async function logIn(credentials) {
    // Set loading to track progress on frontend
    setIsLoading(true);

    // Make login request to backend
    const { username, role, error } = await Api.logIn(credentials);

    if (error) {
      handleError(error, setError);
    } else {
      // Set isAuthenticated to true if the username is present in the response
      // from the backend, otherwise set to false.
      if (username) {
        setIsAuthenticated(true);
        setIsAdmin(role === 'admin');
      }
    }

    // Set loading back to false, indicating to the frontend that the request
    // is complete.
    setIsLoading(false);
  }

  async function logOut() {
    // Set loading to track progress on frontend
    setIsLoading(true);

    // Make login request to backend
    const { error } = await Api.logOut();
    if (error) {
      handleError(error, setError);
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }

    setIsLoading(false);
  }

  async function getUser() {
    // Set loading to track progress on frontend
    setIsLoading(true);

    // Make login request to backend
    const { error, ...user } = await Api.getUser();
    if (error) {
      handleError(error, setError);
    } else {
      if (Object.keys(user).length) {
        setIsAuthenticated(true);
        setIsAdmin(user.role === 'admin');
      }
    }

    setIsLoading(false);
  }

  return {
    logIn,
    logOut,
    getUser,
    isLoading,
    isAuthenticated,
    isAdmin,
    error
  };
}

function handleError(error, setter) {
  setter(error);
  setTimeout(() => {
    setter(null);
  }, 5000);
}

export default AuthProvider;
export { useAuth };

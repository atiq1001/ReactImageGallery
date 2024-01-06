import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const [accessible, setAccessible] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    setAccessible(currentUser || token ? true : false)
  }, [currentUser]);

  return accessible === null ? (
    <div>Loading...</div>
  ) : accessible ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;

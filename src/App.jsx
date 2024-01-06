import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from './components/SignUp';
import Login from './components/Login';
import Gallery from './components/Gallery';
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from './components/PrivateRoute';

function App() {

  const token = window.localStorage.getItem('token');

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={token ? <Navigate to="/gallery" /> : <Navigate to='/login' />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/gallery' element={
            <PrivateRoute>
              <Gallery />
            </PrivateRoute>
          } />
          <Route path='/*' element={<h2>There is no page in this path</h2>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

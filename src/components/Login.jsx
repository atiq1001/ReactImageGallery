import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

function Login() {

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = loginInfo;
    setLoading(true);
    await login(email, password)
      .then((userCredential) => {
        window.localStorage.setItem('token', userCredential.user.uid);
        navigate('/gallery');

      })
      .catch((error) => {

        console.log(error);
      });

    setLoading(false);

  };

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={loginInfo.email}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={loginInfo.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit" disabled={loading}>Login</button>
      </form>
      <p className="signup-link">
        Don't have an account? <Link to="/signup">SignUp</Link>
      </p>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import './SignUp.css'; // Import your CSS file
import { Link, useNavigate } from 'react-router-dom';
import { database } from "../firebase";
import { ref, push } from 'firebase/database';
import { useAuth } from "../contexts/AuthContext";

function SignUp() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }



  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, password } = formData;
    try {
      setLoading(true);
      const userCredential = await signup(email, password);

      const userUid = userCredential.user.uid;

      const dataRef = ref(database, `users/${userUid}`);
      push(dataRef, {
        displayName: name,
        email: email,
      });

      navigate('/login');
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="signup-container">
      <h1>Signup Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit" disabled={loading}>Sign Up</button>
      </form>
      <p className="sign-in-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default SignUp;

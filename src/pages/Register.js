import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './Form.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      toast.warning('Please fill all fields');
      return;
    }

    if (password.length < 6) {
      toast.warning('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Registration successful!');
      setTimeout(() => navigate('/chat'), 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="layout">
      <div className="navbar">
        <div className="logo">Firebase Chat</div>
        <div className="nav-links">
          <a href="/">Home</a>
         
        </div>
      </div>

      <div className="login-container">
        <h2>Create an Account</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        <p className="alt-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>

      <div className="footer">
        © 2025 Firebase Chat App. All rights reserved.
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default Register;

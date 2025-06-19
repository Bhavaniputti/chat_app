import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import './Form.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmaiglAndPassword(auth, email, password);
      navigate('/chat');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
     <div className="layout">
      <div className="navbar">
        <div className="logo">Firebase Chat</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          
        </div>
      </div>

      <div className="login-container">
        <h2>Login to Your Account</h2>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <p className="alt-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>

      <div className="footer">
        © 2025 Firebase Chat App. All rights reserved.
      </div>
    </div>
    </>
  );
}

export default Login;

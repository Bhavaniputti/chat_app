import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <>
     <div className="layout">
      <header className="navbar">
        <div className="logo">Firebase Chat</div>
        <nav className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>

      <section className="hero">
        <h1>Welcome to Your Real-Time Chat Companion</h1>
        <p>Start secure, instant conversations with friends using Firebase Authentication and Realtime DB.</p>
        <Link to="/login">
          <button className="cta-button">Get Started</button>
        </Link>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Realtime Chat</h3>
          <p>Experience live messaging with instant sync across users.</p>
        </div>
        <div className="feature-card">
          <h3>User Authentication</h3>
          <p>Secure login and registration using Firebase Auth.</p>
        </div>
        <div className="feature-card">
          <h3>Cloud Backend</h3>
          <p>Messages are stored and synced through Firebase Database.</p>
        </div>
      </section>

      <footer className="footer">
        © 2025 Firebase Chat App. All Rights Reserved.
      </footer>
    </div>
    </>
  );
}

export default Home;

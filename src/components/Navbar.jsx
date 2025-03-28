import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Femicide Tracker Kenya</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {isAuthenticated && <Link to="/dashboard">Dashboard</Link>}
        <Link to="/help">Help</Link>
        {isAuthenticated ? (
          <>
            <span className="welcome">Welcome, {user?.name}</span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
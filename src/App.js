import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Help from "./pages/Help";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { checkAuth } from "./utils/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Footer from "./pages/Footer";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      const authStatus = await checkAuth();
      setIsAuthenticated(authStatus.isAuthenticated);
      if (authStatus.isAuthenticated) {
        setUser(authStatus.user);
      }
    };
    verifyAuth();
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Navbar
          isAuthenticated={isAuthenticated}
          user={user}
          onLogout={handleLogout}
        />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard user={user} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/help" element={<Help />} />
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login onLogin={handleLogin} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              path="/signup"
              element={
                !isAuthenticated ? (
                  <Signup onSignup={handleLogin} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/api";
import AuthForm from "../components/AuthForm";
import { Alert, Spinner, Container, Card, Button } from "react-bootstrap";

const Login = ({ onLogin }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (credentials) => {
    setLoading(true);
    setError("");

    try {
      const user = await login(credentials);
      onLogin(user); // Update parent auth state
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card
        className="p-4 shadow-lg"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4 text-primary">Login</h2>

        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}

        <AuthForm isLogin={true} onSubmit={handleSubmit} loading={loading} />

        <div className="text-center mt-3">
          Don't have an account?{" "}
          <a href="/signup" className="text-primary fw-bold">
            Sign up
          </a>
        </div>
      </Card>
    </Container>
  );
};

export default Login;

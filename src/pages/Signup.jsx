import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/api";
import { Alert, Spinner, Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";

const Signup = ({ onSignup }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const user = await register(formData);
      onSignup(user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.message.includes("Network Error")
          ? "Cannot connect to server. Please try later."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="shadow-lg border-0 rounded-3 p-4">
            <Card.Body>
              <h2 className="text-center mb-4">Create Account</h2>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit({
                    username: e.target.username.value,
                    password: e.target.password.value,
                    confirmPassword: e.target.confirmPassword.value,
                  });
                }}
              >
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaUser />
                    </span>
                    <Form.Control type="text" name="username" required minLength={3} />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaLock />
                    </span>
                    <Form.Control type="password" name="password" required minLength={6} />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaLock />
                    </span>
                    <Form.Control type="password" name="confirmPassword" required />
                  </div>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                  {loading ? <Spinner size="sm" animation="border" /> : "Sign Up"}
                </Button>
              </Form>

              <p className="text-center mt-3">
                Already have an account? <a href="/login" className="text-decoration-none">Login</a>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;

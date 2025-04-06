import React from "react";
import { Form, Button, Spinner } from "react-bootstrap";

const AuthForm = ({ isLogin, onSubmit, loading }) => {
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
    ...(!isLogin && { confirmPassword: "" }),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          minLength={3}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
        />
      </Form.Group>

      {!isLogin && (
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {formData.password && formData.confirmPassword && (
            <Form.Text
              className={
                formData.password === formData.confirmPassword
                  ? "text-success"
                  : "text-danger"
              }
            >
              {formData.password === formData.confirmPassword
                ? "Passwords match"
                : "Passwords do not match"}
            </Form.Text>
          )}
        </Form.Group>
      )}

      <Button
        variant="primary"
        type="submit"
        disabled={loading}
        className="w-100"
      >
        {loading ? (
          <Spinner animation="border" size="sm" />
        ) : isLogin ? (
          "Login"
        ) : (
          "Sign Up"
        )}
      </Button>
    </Form>
  );
};

export default AuthForm;

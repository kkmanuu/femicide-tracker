import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/api';
import { Alert, Spinner } from 'react-bootstrap';

const Signup = ({ onSignup }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const user = await register(formData);
      onSignup(user); // Update parent component state
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message.includes('Network Error') 
        ? 'Cannot connect to server. Please try later.'
        : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        
        {error && <Alert variant="danger">{error}</Alert>}

        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit({
            username: e.target.username.value,
            password: e.target.password.value,
            confirmPassword: e.target.confirmPassword.value
          });
        }}>
          <div className="form-group">
            <label>Username</label>
            <input 
              name="username" 
              type="text" 
              required 
              minLength={3}
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? <Spinner size="sm" /> : 'Sign Up'}
          </button>
        </form>

        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Signup;
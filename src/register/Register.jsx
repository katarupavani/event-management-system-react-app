import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'; // Add the styles below in Register.css

export default function Register() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/create', {
        username,
        email,
        password,
        role
      });

      if (response.data.status === 'success') {
        alert('Registration successful!');
        navigate('/login');
      } else {
        alert('Registration failed: ' + response.data.message);
      }
    } catch (error) {
      alert('Error during registration: ' + error.message);
    }
  }

  return (
    <div className="register-wrapper d-flex align-items-center justify-content-center">
      <div className="register-card p-4 shadow-lg w-100" style={{ maxWidth: '450px' }}>
        <h2 className="text-center mb-4 fw-bold fs-4 text-primary">Create an Account</h2>
        <form onSubmit={register}>
          <div className="form-group mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="role" className="form-label">Role</label>
            <select
              id="role"
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-lg">
              Register
            </button>
          </div>
        </form>

        <p className="mt-3 text-center text-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-decoration-none fw-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

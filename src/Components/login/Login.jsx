import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Make sure this file exists

export default function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassWord] = useState('');
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', {
        username,
        password,
      });

      if (response.data.status === 'success') {
        alert('User login successful.');
        const user = response.data.data;
        const role = user.role || '';

        localStorage.setItem('username', user.username);
        localStorage.setItem('userId', user.userId);
        localStorage.setItem('role', role.toLowerCase());

        switch (role.toLowerCase()) {
          case 'admin':
            navigate('/admin');
            break;
          case 'organizer':
            navigate('/organizer');
            break;
          case 'user':
            navigate('/user');
            break;
          default:
            navigate('/');
        }
      } else {
        alert('Login failed: ' + response.data.message);
      }
    } catch (error) {
      alert('Error during login: ' + error.message);
    }
  }

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center">
      <div className="login-card p-4 shadow-lg w-100" style={{ maxWidth: '450px' }}>
        <h2 className="text-center mb-4 fw-bold fs-4 text-primary">Login to Eventify</h2>
        <form onSubmit={login}>
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

          <div className="form-group mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassWord(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-lg">
              Login
            </button>
          </div>
        </form>

        <p className="mt-3 text-center text-muted">
          Don't have an account?{' '}
          <Link to="/register" className="text-decoration-none fw-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

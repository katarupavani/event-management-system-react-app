import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassWord] = useState('');
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', {
        username: username,
        password: password
      });

      if (response.data.status === 'success') {
        alert('User login successful.');

        const role = response.data.data.role;
        const user = response.data.data;
        localStorage.setItem('username', user.username);

        if (role === 'admin') {
          navigate('/admin');
        } else if (role === 'organizer') {
          navigate('/organizer');
        } else if (role === 'User') {
          navigate('/user');
        } else {
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Login</h3>
              <form onSubmit={login}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter Username"
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter Password"
                    onChange={(e) => setPassWord(e.target.value)}
                    required
                  />
                </div>

                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>

                <p className="text-center">
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

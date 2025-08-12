import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import LandingPage from '../Components/landingpage/LandingPage';

const navStyles = {
  background: 'linear-gradient(135deg, #2d68e6, #1a4fb8)',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(21, 67, 124, 0.3)',
  marginBottom: '1.5rem',
};

const linkStyles = {
  color: '#dbe9ff',
  fontWeight: 600,
  marginRight: '1.5rem',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
};

const activeLinkStyles = {
  color: '#ffdd57',
};

export default function Home() {
  const location = useLocation();

  return (
    <>
    <Nav as="ul" style={navStyles}>
      <Nav.Item as="li">
        <Nav.Link
          as={Link}
          to=""
          style={{
            ...linkStyles,
            ...(location.pathname === '/home' ? activeLinkStyles : {}),
          }}
        >
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link
          as={Link}
          to="/login"
          style={{
            ...linkStyles,
            ...(location.pathname === '/login' ? activeLinkStyles : {}),
          }}
        >
          Login
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link
          as={Link}
          to="/register"
          style={{
            ...linkStyles,
            ...(location.pathname === '/register' ? activeLinkStyles : {}),
          }}
        >
          Register
        </Nav.Link>
      </Nav.Item>
    </Nav>
    <LandingPage />
    </>
  );
}

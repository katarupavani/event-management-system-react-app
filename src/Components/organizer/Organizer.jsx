import React, { useEffect } from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Testimonials from '../testimonials/Testimonials';

const navbarStyles = `
  .custom-navbar {
    background: linear-gradient(135deg, #2d68e6, #1a4fb8);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  .custom-navbar .navbar-brand {
    color: #f0f8ff;
    font-weight: 700;
  }
  .custom-navbar .nav-link,
  .custom-navbar .navbar-text,
  .custom-navbar .dropdown-toggle {
    color: #dbe9ff;
    transition: color 0.3s ease;
  }
  .custom-navbar .nav-link:hover,
  .custom-navbar .nav-link:focus,
  .custom-navbar .nav-link.active {
    color: #ffdd57;
  }
  .custom-navbar .dropdown-toggle::after {
    border-top-color: #dbe9ff;
  }
  .custom-navbar .dropdown-menu {
    background-color: #1a4fb8;
    border: none;
  }
  .custom-navbar .dropdown-item {
    color: #dbe9ff;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  .custom-navbar .dropdown-item:hover,
  .custom-navbar .dropdown-item:focus {
    background-color: #ffdd57;
    color: #1a4fb8;
  }
  .navbar-welcome-text {
    color: #ffdd57;
    font-weight: 600;
    font-size: 1rem;
    white-space: nowrap;
    margin-left: 15px;
  }
  @media (max-width: 991px) {
    .navbar-welcome-text {
      margin-top: 10px;
      margin-left: 0;
      color: #dbe9ff;
    }
  }
`;

export default function Organizer() {
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = "/home";
  };

  // Inject navbar styles on mount
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = navbarStyles;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  if (role !== 'organizer') {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>Access Denied 🚫</h2>
        <p>You are not authorized to view this page.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar expand="lg" className="custom-navbar" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#">Eventify</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/createvent">Create Event</Nav.Link>
              <Nav.Link href="/booking">Booking Details</Nav.Link>
              <Nav.Link href="/searchevents">Search Events</Nav.Link>
              <Nav.Link href="/getevent">All Events</Nav.Link>
              <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
                Logout
              </Nav.Link>
            </Nav>
             <div className="navbar-text text-white ms-auto fw-semibold fs-5">
              Welcome {username || "Guest"} 🎉
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Testimonials Section */}
      <hr className="my-5" />
      <Testimonials />
    </>
  );
}

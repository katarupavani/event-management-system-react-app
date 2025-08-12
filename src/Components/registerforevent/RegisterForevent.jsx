import React, { useState, useEffect } from 'react';
import {
  Form, Button, Alert, Container, Card, Navbar, Nav, NavDropdown
} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterForEvent.css';

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
  .custom-navbar .navbar-text {
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
`;

export default function EventRegister() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');
  const [username, setUsername] = useState('');
  const [eventId, setEventId] = useState('');
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || '';
    setUsername(storedUsername);

    axios.get('/api/events').then(res => setEvents(res.data.data || []));
    axios.get('/api/users').then(res => setUsers(res.data.data || []));
  }, []);

  // Inject navbar styles on mount
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = navbarStyles;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    navigate('/home');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setValidated(true);

    if (!username.trim() || !eventId) return;

    const foundUser = users.find(u => u.username === username);
    if (!foundUser) {
      setMessage('Username not found');
      setVariant('danger');
      return;
    }

    try {
      const res = await axios.post('/api/bookings/create', {
        userId: foundUser.userId,
        eventId: parseInt(eventId, 10)
      });
      setMessage(res.data.message);
      setVariant(res.data.status === 'success' ? 'success' : 'danger');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Server error');
      setVariant('danger');
    }
  };

  return (
    <>
      <Navbar expand="lg" className="custom-navbar shadow-sm">
        <Container>
          <Navbar.Brand href="#" className="fw-bold fs-3">Eventify</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link href="/user">Home</Nav.Link>
              <Nav.Link href="/registerevent">Register for Event</Nav.Link>
              <Nav.Link href="/mybookings">Booking Details</Nav.Link>
              <Nav.Link href="/allevents">All Events</Nav.Link>
                          <Nav>
                  <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
                    Logout
                  </Nav.Link>
                </Nav>
            </Nav>
            <div className="navbar-text text-white ms-auto fw-semibold fs-5">
              Welcome {username || "Guest"} 🎉
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '80vh' }}
      >
        <Card className="register-card p-4 shadow-lg w-100" style={{ maxWidth: '450px' }}>
          <Card.Title className="text-center mb-4 fw-bold fs-4">
            Book an Event
          </Card.Title>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {message && <Alert variant={variant} className="text-center">{message}</Alert>}

            <Form.Group controlId="username" className="mb-4">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter username"
                value={username}
                readOnly
                className="text-secondary"
              />
              <Form.Control.Feedback type="invalid">
                Username is required.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="event" className="mb-4">
              <Form.Label>Select Event</Form.Label>
              <Form.Select
                required
                value={eventId}
                onChange={e => setEventId(e.target.value)}
              >
                <option value="">-- Select Event --</option>
                {events.map(evt => (
                  <option key={evt.eventId} value={evt.eventId}>
                    {evt.eventName}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select an event.
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit" size="lg" className="btn-register">
                Book Event
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </>
  );
}

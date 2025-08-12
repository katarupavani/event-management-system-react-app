import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  Container,
  Alert,
  Spinner,
  Navbar,
  Nav,
  NavDropdown,
  Card,
  Badge
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Bookingdetails.css';

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

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    navigate('/home');
  };

  useEffect(() => {
    if (username) {
      axios
        .get(`/api/bookings/username/${username}`)
        .then((res) => {
          if (res.data.status === 'success') {
            setBookings(res.data.data);
          } else {
            setError(res.data.message || 'Failed to fetch bookings');
          }
        })
        .catch((err) => {
          setError('Error fetching bookings: ' + err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [username]);

  // Inject custom navbar styles on mount
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = navbarStyles;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Navbar expand="lg" className="custom-navbar shadow-sm" sticky="top">
        <Container>
          <Navbar.Brand href="#" className="fw-bold fs-3">
            Eventify
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto" navbarScroll>
              <Nav.Link href="/user">Home</Nav.Link>
              <Nav.Link href="/registerevent">Register for Event</Nav.Link>
              <Nav.Link href="/mybookings">Booking Details</Nav.Link>
              <Nav.Link href="/feedback">Submit Feedback</Nav.Link>
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

      <Container className="mt-5">
        {!username ? (
          <Alert variant="warning" className="text-center">
            Please log in to view your bookings.
          </Alert>
        ) : loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" role="status" />
            <div className="mt-2">Loading bookings...</div>
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        ) : bookings.length === 0 ? (
          <Alert variant="info" className="text-center">
            No bookings found. <Badge bg="secondary">Try registering for an event!</Badge>
          </Alert>
        ) : (
          <>
            <h2 className="mb-4 text-center text-primary fw-bold">My Bookings</h2>
            <Card className="shadow-sm">
              <Card.Body>
                <Table striped bordered hover responsive className="align-middle mb-0">
                  <thead className="table-primary">
                    <tr>
                      <th>Event Name</th>
                      <th>Event Date</th>
                      <th>Location</th>
                      <th>Timings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.bookId}>
                        <td>{booking.event.eventName}</td>
                        <td>{formatDate(booking.event.date)}</td>
                        <td>{booking.event.location}</td>
                        <td>{booking.event.startTime}-{booking.event.endTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </>
        )}
      </Container>
    </>
  );
}

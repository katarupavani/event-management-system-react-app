import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Booking.css'
import {
  Container, Nav, Navbar, NavDropdown,
  Table, Button, Card, Col, Row
} from 'react-bootstrap';

export default function BookEvent() {
  const [bookings, setBookings] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/home";
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Inject Navbar + Custom Styles
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
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
      }
      .custom-navbar .dropdown-item:hover {
        background-color: #ffdd57;
        color: #1a4fb8;
      }

      .table-custom {
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
      .table-custom thead {
        background: linear-gradient(135deg, #1a4fb8, #2d68e6);
        color: #fff;
      }
      .table-custom tbody tr:hover {
        background-color: rgba(45, 104, 230, 0.05);
      }
      .table-custom th, .table-custom td {
        vertical-align: middle;
        text-align: center;
      }

      .booking-card {
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 16px;
        box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .booking-card:hover {
        transform: scale(1.02);
        box-shadow: 0 12px 24px rgba(0,0,0,0.12);
      }
      .booking-card .card-title {
        font-weight: 600;
        color: #2d68e6;
      }
      .booking-card .card-text {
        font-size: 0.95rem;
        color: #444;
      }
    `;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  function fetchBookings() {
    axios.get('/api/bookings')
      .then(resp => {
        const data = resp.data?.data || resp.data;
        const seen = {};
        const events = [];

        data.forEach(b => {
          const event = b.event;
          const key = event.eventName + event.date;
          if (!seen[key]) {
            seen[key] = true;
            events.push(event);
          }
        });

        setBookings({ all: data, events });
      })
      .catch(err => {
        setErrorMsg(err.message || 'Failed to load bookings');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleDelete(bookId) {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;

    axios.delete(`/api/bookings/${bookId}`)
      .then(() => {
        alert('Booking deleted successfully');
        fetchBookings();
      })
      .catch(err => {
        alert('Failed to delete booking: ' + (err.message || 'Unknown error'));
      });
  }

  const filteredBookings = selectedEvent
    ? bookings.all.filter(b =>
        b.event.eventName === selectedEvent.eventName &&
        b.event.date === selectedEvent.date)
    : [];

  if (loading) return <div className="text-center mt-5">Loading bookings...</div>;
  if (errorMsg) return <div className="text-danger text-center mt-5">Error: {errorMsg}</div>;

  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" className="custom-navbar shadow-sm" sticky="top">
        <Container>
          <Navbar.Brand href="/organizer">Eventify</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link href="/createvent">Create Event</Nav.Link>
              <Nav.Link href="/booking" active>Booking Details</Nav.Link>
              <Nav.Link href="/searchevents">Search Events</Nav.Link>
              <Nav.Link href="/getevent">All Events</Nav.Link>
               <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
                Logout
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto align-items-center">
               <div className="navbar-text text-white ms-auto fw-semibold fs-5">
              Welcome {username || "Guest"} 🎉
            </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Content */}
      <Container className="mt-5 mb-5">
        <h2 className="text-center text-primary fw-bold mb-4">All Events</h2>

        <Table bordered responsive className="table-custom mt-3">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Event Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.events && bookings.events.length > 0 ? (
              bookings.events.map((event, idx) => (
                <tr key={idx}>
                  <td>{event.eventName}</td>
                  <td>{event.date}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => setSelectedEvent(event)}
                    >
                      View Bookings
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-muted text-center">No events found</td>
              </tr>
            )}
          </tbody>
        </Table>

        {selectedEvent && (
          <>
            <h4 className="mt-5 text-secondary fw-semibold">
              Bookings for "{selectedEvent.eventName}" on {selectedEvent.date}
            </h4>

            {filteredBookings.length > 0 ? (
              <Row xs={1} sm={2} md={3} lg={4} className="g-4 mt-3">
                {filteredBookings.map((book, i) => (
                  <Col key={i}>
                    <Card className="booking-card h-100">
                      <Card.Body>
                        <Card.Title>User: {book.user.username}</Card.Title>
                        <Card.Text>
                          <strong>Location:</strong> {book.event.location || 'Not Yet Decided'}<br />
                          <strong>Time:</strong> {book.event.startTime} - {book.event.endTime}
                        </Card.Text>
                        <div className="d-flex justify-content-between mt-3">
                          <Link to={`update/${book.bookId}`} className="btn btn-sm btn-outline-primary">
                            Update
                          </Link>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(book.bookId)}
                          >
                            Delete
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <p className="text-muted mt-3">No bookings for this event.</p>
            )}
          </>
        )}
      </Container>
    </>
  );
}

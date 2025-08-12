import React, { useState } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Form, Button, Alert,
  Card, Navbar, Nav, NavDropdown
} from 'react-bootstrap';

export default function CreateEvent() {
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    window.location.href = "/home";
  };

  const [event, setEvent] = useState({
    eventName: '',
    category: '',
    description: '',
    location: '',
    date: '',
    startTime: '',
    endTime: '',
    limit: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!event.eventName || !event.category || !event.date || !event.startTime || !event.endTime || !event.limit) {
      setMessage('Please fill all required fields.');
      return;
    }

    axios.post('/api/events/create', event)
      .then((response) => {
        if (response.data.status === 'success') {
          setMessage('✅ Event created successfully!');
          setEvent({
            eventName: '',
            category: '',
            description: '',
            location: '',
            date: '',
            startTime: '',
            endTime: '',
            limit: ''
          });
        } else {
          setMessage(response.data.message || '❌ Something went wrong.');
        }
      })
      .catch((error) => {
        setMessage('❌ Error: ' + (error.response?.data?.message || error.message));
      });
  };

  return (
    <>
      {/* Custom Navbar Styles */}
      <style>{`
        .custom-navbar {
          background: linear-gradient(135deg, #2d68e6, #1a4fb8);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        .custom-navbar .navbar-brand {
          color: #fff;
          font-weight: bold;
          font-size: 1.5rem;
        }
        .custom-navbar .nav-link, .custom-navbar span {
          color: #f1f1f1;
          margin-right: 10px;
        }
        .custom-navbar .nav-link:hover {
          color: #ffd700;
        }
        .custom-navbar .dropdown-menu {
          background-color: #1a4fb8;
        }
        .custom-navbar .dropdown-item {
          color: #f1f1f1;
        }
        .custom-navbar .dropdown-item:hover {
          background-color: #ffd700;
          color: #1a4fb8;
        }
        .card {
          border: none;
          border-radius: 12px;
        }
        .btn-primary {
          background-color: #1a4fb8;
          border: none;
        }
        .btn-primary:hover {
          background-color: #163d9c;
        }
      `}</style>

      {/* Navbar */}
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="/organizer">Eventify</Navbar.Brand>
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

      {/* Create Event Form */}
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="p-4 shadow-lg">
              <Card.Body>
                <h2 className="text-center text-primary fw-bold mb-4">Create Event</h2>

                {message && <Alert variant="info">{message}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="eventName"
                      value={event.eventName}
                      onChange={handleChange}
                      required
                      placeholder="Enter event name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      name="category"
                      value={event.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Select Category --</option>
                      <option value="wedding">Wedding</option>
                      <option value="birthday">Birthday</option>
                      <option value="scienceconference">Science Conference</option>
                      <option value="haldi">Haldi</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      value={event.description}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Optional description"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={event.location}
                      onChange={handleChange}
                      placeholder="Enter event location"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={event.date}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                      type="time"
                      name="startTime"
                      value={event.startTime}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>End Time</Form.Label>
                    <Form.Control
                      type="time"
                      name="endTime"
                      value={event.endTime}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Limit</Form.Label>
                    <Form.Control
                      type="number"
                      name="limit"
                      value={event.limit}
                      onChange={handleChange}
                      required
                      min="1"
                      placeholder="Number of attendees allowed"
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Create Event
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Nav, Navbar, Form, Button, Container, Row, Col } from 'react-bootstrap';

export default function EventRegister() {
  const [username, setUsername] = useState('');
  const [eventId, setEventId] = useState('');
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/events')
      .then(res => {
        console.log("Events API Response:", res.data);
        const eventList = res.data.data || [];
        setEvents(Array.isArray(eventList) ? eventList : []);
      })
      .catch(err => console.error('Error fetching events:', err));

    axios.get('/api/users')
      .then(res => {
        console.log("Users API Response:", res.data);
        const userList = res.data.data || [];
        setUsers(Array.isArray(userList) ? userList : []);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const foundUser = users.find(user => user.username === username);
    if (!foundUser) {
      alert("Username not found. Please check and try again.");
      return;
    }

    const bookingData = {
      userId: foundUser.userId || foundUser.id,
      eventId: parseInt(eventId)
    };

    axios.post('/api/bookings/create', bookingData)
      .then(res => {
        alert('Event booked successfully!');
        setUsername('');
        setEventId('');
        console.log(res.data);
      })
      .catch(error => {
        alert(error.response?.data?.message || 'Error booking event.');
      });
  };

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#">Events</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/event-register">Register for Event</Nav.Link>
            <Nav.Link href="/">Booking Details</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <Row className="justify-content-md-center mt-4">
          <Col md={6}>
            <h3 className="text-center mb-4">Book an Event</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Enter Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="event">
                <Form.Label>Select Event</Form.Label>
                <Form.Select
                  value={eventId}
                  onChange={(e) => setEventId(e.target.value)}
                  required
                >
                  <option value="">-- Select Event --</option>
                  {events.map(event => (
                    <option key={event.eventId} value={event.eventId}>
                      {event.eventName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" type="submit">
                  Book Event
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> cd4033f2b8348d954ddfb0dea896a2a0af570e5d

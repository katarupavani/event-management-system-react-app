// BookEvent.jsx
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';

export default function BookEvent() {
  const [bookings, setBookings] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  function fetchBookings() {
    axios.get('/api/bookings')
      .then(resp => {
        const data = resp.data && resp.data.data ? resp.data.data : resp.data;

        const seen = {};
        const events = [];
        for (let i = 0; i < data.length; i++) {
          const event = data[i].event;
          const key = event.eventName + event.date;
          if (!seen[key]) {
            seen[key] = true;
            events.push(event);
          }
        }

        setBookings({ all: data, events });
      })
      .catch(err => {
        console.error('Error fetching bookings', err);
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
    ? bookings.all.filter(b => b.event.eventName === selectedEvent.eventName && b.event.date === selectedEvent.date)
    : [];

  if (loading) return <div>Loading bookings...</div>;
  if (errorMsg) return <div style={{ color: 'red' }}>Error: {errorMsg}</div>;

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Events</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/event-register">Register for Event</Nav.Link>
            <Nav.Link href="/bookings">Booking Details</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <h2>All Events</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
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
                    <Button variant="primary" onClick={() => setSelectedEvent(event)}>
                      View Bookings
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No events found</td>
              </tr>
            )}
          </tbody>
        </Table>

        {selectedEvent && (
          <>
            <h4 className="mt-4">Bookings for "{selectedEvent.eventName}" on {selectedEvent.date}</h4>
            {filteredBookings.length > 0 ? (
              <Row xs={1} sm={2} md={3} lg={4} className="g-4 mt-2">
                {filteredBookings.map((book, i) => (
                  <Col key={i}>
                    <Card>
                      <Card.Body>
                        <Card.Title>User: {book.user.username}</Card.Title>
                        <Card.Text>
                          <strong>Location:</strong> {book.event.location || 'Not Yet Decided'}<br />
                          <strong>Event Timings:</strong> {book.event.startTime} - {book.event.endTime}
                        </Card.Text>

                        <div className="d-flex justify-content-between mt-3">
                          <Link
                            to={`update/${book.bookId}`}
                            className="btn btn-primary btn-sm"
                          >
                            Update
                          </Link>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(book.bookId)}
                          >
                            Delete
                          </button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <p>No bookings for this event.</p>
            )}
          </>
        )}
      </Container>
    </>
  );
}
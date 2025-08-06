import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
export default function GetEvent() {
  const [bookings, setBookings] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const resp = await axios.get('/api/bookings');
        setBookings(Array.isArray(resp.data) ? resp.data : resp.data.data);
      } catch (err) {
        console.error('Error fetching bookings', err);
        setErrorMsg(err.message || 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []); 

  if (loading) return <div>Loading bookings...</div>;
  if (errorMsg) return <div style={{ color: 'red' }}>Error: {errorMsg}</div>;

  return (
    <>

    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Events</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="/event-register">Register for Event</Nav.Link>
            <Nav.Link href="">Booking Details</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      



      <h2>All Events</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {bookings.length > 0 ? (
          bookings.map((book, index) => (
            <Col key={book.BookId ?? index}>
              <Card>
                <Card.Body>
                  <Card.Title>{book.event.eventName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Booked by: {book.user.username}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Event Date:</strong> {book.event.date}<br />
                    <strong>StartTime:</strong> {book.event.startTime}<br />
                    <strong>EndTime:</strong> {book.event.endTime}<br />
                    <strong>Location:</strong> {book.event.location || 'Not Yet Decided'}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Card>
              <Card.Body>No bookings found</Card.Body>
            </Card>
          </Col>
        )}
      </Row>


    </>
  );
}

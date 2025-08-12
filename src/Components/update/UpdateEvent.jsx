import React, { useState, useEffect } from 'react';
import {
  Form, Button, Alert, Container, Card
} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [events, setEvents] = useState([]);
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');

  useEffect(() => {
    fetch(`/api/bookings/book/alternate/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') setBooking(data.data);
        else setMessage('Failed to load booking');
      })
      .catch(() => setMessage('Error loading booking'));
  }, [id]);

  useEffect(() => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const uniqueEvents = data.data
            .map(b => b.event)
            .filter((event, index, self) => index === self.findIndex(e => e.eventId === event.eventId));
          setEvents(uniqueEvents);
        }
      })
      .catch(() => setMessage('Error loading events'));
  }, []);

  const handleEventChange = (e) => {
    const eventId = parseInt(e.target.value, 10);
    const selectedEvent = events.find(event => event.eventId === eventId);
    if (selectedEvent) setBooking(prev => ({ ...prev, event: selectedEvent }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setValidated(true);
    setMessage('');

    if (!booking?.event?.eventId) {
      setMessage('Please select an event');
      setVariant('danger');
      return;
    }

    const payload = {
      bookId: booking.bookId,
      userId: booking.user.userId,
      eventId: booking.event.eventId,
    };

    try {
      const res = await fetch(`/api/bookings/update/${booking.bookId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage('Booking updated successfully!');
        setVariant('success');
        setTimeout(() => navigate('/'), 1500);
      } else {
        const err = await res.json();
        setMessage(err.message || 'Update failed');
        setVariant('danger');
      }
    } catch {
      setMessage('Server error, please try again later.');
      setVariant('danger');
    }
  };

  if (!booking) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div>Loading booking...</div>
      </Container>
    );
  }

  const username = booking.user?.username || '';

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card className="p-4 shadow-lg w-100" style={{ maxWidth: 450 }}>
        <Card.Title className="text-center mb-4 fw-bold fs-4">Update Booking</Card.Title>

        <Form noValidate validated={validated} onSubmit={handleUpdate}>
          {message && <Alert variant={variant} className="text-center">{message}</Alert>}

          <Form.Group controlId="username" className="mb-4">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              readOnly
              className="text-secondary"
            />
          </Form.Group>

          <Form.Group controlId="eventSelect" className="mb-4">
            <Form.Label>Select Event</Form.Label>
            <Form.Select
              required
              value={booking.event?.eventId || ''}
              onChange={handleEventChange}
            >
              <option value="">-- Select Event --</option>
              {events.map(event => (
                <option key={event.eventId} value={event.eventId}>
                  {event.eventName} ({event.date})
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select an event.
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit" size="lg">
              Update Booking
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

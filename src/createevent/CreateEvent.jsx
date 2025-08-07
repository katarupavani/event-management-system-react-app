import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';

export default function CreateEvent() {
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
          setMessage('Event created successfully!');
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
          setMessage(response.data.message || 'Something went wrong.');
        }
      })
      .catch((error) => {
        setMessage('Error: ' + (error.response?.data?.message || error.message));
      });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="border p-4 shadow rounded">
            <Card.Body>
              <h2 className="text-center mb-4">Create Event</h2>

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
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
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
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={event.description}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={event.location}
                    onChange={handleChange}
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

                <Form.Group className="mb-3">
                  <Form.Label>Limit</Form.Label>
                  <Form.Control
                    type="number"
                    name="limit"
                    value={event.limit}
                    onChange={handleChange}
                    required
                    min="1"
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
  );
}

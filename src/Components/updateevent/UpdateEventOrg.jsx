import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateEventOrg() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    eventName: '',
    category: '',
    description: '',
    location: '',
    date: '',
    startTime: '',
    endTime: '',
    limit: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    axios.get(`/api/events/${id}`)
      .then(res => {
        if (res.data?.status === 'success') {
          setEventData(res.data.data);
          setError('');
        } else {
          setError(res.data?.error_message || 'Error loading event');
        }
      })
      .catch(() => setError("Server error"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    axios.put(`/api/events/update/${id}`, eventData)
      .then(res => {
        if (res.data?.status === 'success') {
          setSuccessMsg("Event updated successfully!");
          setError('');
          // Optionally navigate after update
          // navigate('/getevent');
        } else {
          setError(res.data?.error_message || 'Update failed');
          setSuccessMsg('');
        }
      })
      .catch(() => {
        setError("Server error");
        setSuccessMsg('');
      });
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 fs-5 text-secondary">Loading event details...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5" style={{ maxWidth: '600px' }}>
      <Card className="shadow-sm rounded-4 p-4">
        <h2 className="text-center mb-4 text-primary fw-bold">Update Event</h2>
        {error && <Alert variant="danger" className="text-center">{error}</Alert>}
        {successMsg && <Alert variant="success" className="text-center">{successMsg}</Alert>}

        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3" controlId="eventName">
            <Form.Label className="fw-semibold">Event Name</Form.Label>
            <Form.Control
              type="text"
              name="eventName"
              value={eventData.eventName}
              onChange={handleChange}
              placeholder="Enter event name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
            <Form.Label className="fw-semibold">Category</Form.Label>
            <Form.Select
              name="category"
              value={eventData.category}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Category --</option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
              <option value="Science Conference">Science Conference</option>
              <option value="Haldi">Haldi</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label className="fw-semibold">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={eventData.description}
              onChange={handleChange}
              placeholder="Describe your event"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="location">
            <Form.Label className="fw-semibold">Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              placeholder="Event location"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="date">
            <Form.Label className="fw-semibold">Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="startTime">
            <Form.Label className="fw-semibold">Start Time</Form.Label>
            <Form.Control
              type="time"
              name="startTime"
              value={eventData.startTime}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="endTime">
            <Form.Label className="fw-semibold">End Time</Form.Label>
            <Form.Control
              type="time"
              name="endTime"
              value={eventData.endTime}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="limit">
            <Form.Label className="fw-semibold">Participant Limit</Form.Label>
            <Form.Control
              type="number"
              name="limit"
              min="1"
              value={eventData.limit}
              onChange={handleChange}
              placeholder="Set participant limit"
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" className="px-4 py-2 fw-semibold">
              Update Event
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

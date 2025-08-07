import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateEvent() {
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

  useEffect(() => {
    axios.get(`/api/events/${id}`).then(res => {
      if (res.data?.status === 'success') {
        setEventData(res.data.data);
      } else {
        setError(res.data?.error_message || 'Error loading event');
      }
    }).catch(() => setError("Server error"));
  }, [id]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/events/update/${id}`, eventData)
      .then(res => {
        if (res.data?.status === 'success') {
          alert("updated successfully")
        } else {
          setError(res.data?.error_message || 'Update failed');
        }
      }).catch(() => setError("Server error"));
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Update Event</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Event Name</Form.Label>
          <Form.Control type="text" name="eventName" value={eventData.eventName} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" name="category" value={eventData.category} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" name="description" value={eventData.description} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" name="location" value={eventData.location} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" name="date" value={eventData.date} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Start Time</Form.Label>
          <Form.Control type="time" name="startTime" value={eventData.startTime} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>End Time</Form.Label>
          <Form.Control type="time" name="endTime" value={eventData.endTime} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Limit</Form.Label>
          <Form.Control type="number" name="limit" value={eventData.limit} onChange={handleChange} required />
        </Form.Group>
        <div className="text-center">
          <Button variant="primary" type="submit">Update</Button>
        </div>
      </Form>
    </Container>
  );
}

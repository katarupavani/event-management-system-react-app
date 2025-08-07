import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Alert, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export default function GetEvent() {
  const [events, setEvents] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate(); // for update navigation

  useEffect(() => {
    getEvents();
  }, []);

  async function getEvents() {
    try {
      const resp = await axios.get("/api/events");
      if (resp.data?.status === 'sucess') {
        setEvents(resp.data?.data);
      } else {
        setErrorMsg(resp.data?.error_message || "Failed to fetch events.");
      }
    } catch (error) {
      setErrorMsg("Server error. Please try again later.");
    }
  }

  async function deleteEvent(id) {
    try {
      const response = await axios.delete(`/api/events/${id}`);
      if (response.data?.status === 'success') {
        setEvents(events.filter(event => event.eventId !== id));
      } else {
        alert(response.data?.error_message || "Failed to delete event.");
      }
    } catch (error) {
      alert("Error deleting event.");
    }
  }

  const updateEvent = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Event List</h2>

      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

      <Row>
        {events.map((event, index) => (
          <Col md={4} sm={6} xs={12} className="mb-4" key={index}>
            <Card className="shadow">
              <Card.Body>
                <Card.Title>{event.eventName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{event.category}</Card.Subtitle>
                <Card.Text>
                  <strong>Description:</strong> {event.description || "N/A"} <br />
                  <strong>Location:</strong> {event.location || "N/A"} <br />
                  <strong>Date:</strong> {event.date} <br />
                  <strong>Time:</strong> {event.startTime} - {event.endTime} <br />
                  <strong>Limit:</strong> {event.limit}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="danger" onClick={() => deleteEvent(event.eventId)}>
                    Delete
                  </Button>
                  <Button variant="primary" onClick={() => updateEvent(event.eventId)}>
                    Update
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}



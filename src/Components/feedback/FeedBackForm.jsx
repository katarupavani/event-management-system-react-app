import React, { useState, useEffect } from 'react';
import feedbackBanner from '../../assets/feedback-1.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    username: localStorage.getItem('username') || '',
    eventId: '',
    rating: '',
    comment: ''
  });

  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    navigate('/home');
  };

  useEffect(() => {
    axios.get('/api/events')
      .then(res => {
        const eventList = res.data.data || [];
        setEvents(Array.isArray(eventList) ? eventList : []);
      })
      .catch(err => {
        console.error('Error fetching events:', err);
        setMessage('Failed to load events');
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, eventId, rating, comment } = feedback;

    if (!username || !eventId || !rating || !comment) {
      setMessage('Please fill in all fields.');
      return;
    }

    const payload = {
      userName: username,
      eventid: parseInt(eventId),
      rating: parseInt(rating),
      comment
    };

    try {
      const res = await fetch('/api/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setMessage('✅ Feedback submitted successfully!');
        setFeedback({ username, eventId: '', rating: '', comment: '' });
      } else {
        const err = await res.json();
        setMessage(`❌ Submission failed: ${err.message || res.statusText}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      setMessage('Error submitting feedback.');
    }
  };

  return (
    <>
      {/* Custom Navbar Styles */}
      <style>{`
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
        .custom-navbar .nav-link:focus,
        .custom-navbar .nav-link.active {
          color: #ffdd57;
        }
      `}</style>

      {/* Navbar */}
      <Navbar expand="lg" className="custom-navbar shadow-sm" sticky="top">
        <Container>
          <Navbar.Brand href="/">Events</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/user">Home</Nav.Link>
              <Nav.Link href="/registerevent">Register for Event</Nav.Link>
              <Nav.Link href="/mybookings">Booking Details</Nav.Link>
              <Nav.Link href="/allevents">All Events</Nav.Link>
              <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
                Logout
              </Nav.Link>
            </Nav>

            <Navbar.Text className="text-white fw-semibold fs-5 ms-auto">
              Welcome {username || "Guest"} 🎉
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Feedback Form */}
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card p-4 w-100" style={{ maxWidth: '600px' }}>
          <img
            src={feedbackBanner}
            alt="Feedback Banner"
            className="img-fluid rounded mb-4"
            style={{ height: '300px', objectFit: 'cover' }}
          />
          <h2 className="text-primary text-center mb-4">Event Feedback Form</h2>

          {message && <div className="alert alert-info">{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                className="form-control"
                value={feedback.username}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label>Event:</label>
              <select
                name="eventId"
                className="form-select"
                value={feedback.eventId}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Event --</option>
                {events.map(ev => (
                  <option key={ev.eventId} value={ev.eventId}>
                    {ev.eventName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label>Rating (1–5):</label>
              <input
                type="number"
                name="rating"
                className="form-control"
                value={feedback.rating}
                onChange={handleChange}
                min="1"
                max="5"
                placeholder="Rate the event"
                required
              />
            </div>

            <div className="mb-4">
              <label>Comment:</label>
              <textarea
                name="comment"
                className="form-control"
                rows="3"
                value={feedback.comment}
                onChange={handleChange}
                placeholder="Write your feedback"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Submit Feedback</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FeedbackForm;

import React, { useState, useEffect } from 'react';
import feedbackBanner from '../assets/feedback-1.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    username: '',
    eventId: '',
    rating: '',
    comment: ''
  });
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch events from backend
    fetch('http://localhost:8080/api/events')
      .then(res => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        // Assuming ResponseData format: { status, message, data: [ { eventId, eventName }, ... ] }
        const list = data.data ?? [];
        setEvents(list);
      })
      .catch(err => {
        console.error('Error fetching events:', err);
        setMessage('Failed to load events.');
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.username || !feedback.eventId || !feedback.rating || !feedback.comment) {
      setMessage('Please fill in all fields.');
      return;
    }
const payload = {
  userName: feedback.username,   // frontend sends userName (string)
  eventid: parseInt(feedback.eventId), // event id (int)
  rating: parseInt(feedback.rating),
  comment: feedback.comment
};


    try {
      const res = await fetch('api/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setMessage('Feedback submitted successfully!');
        setFeedback({ username: '', eventId: '', rating: '', comment: '' });
      } else {
        const err = await res.json();
        setMessage(`Submission failed: ${err.message || res.statusText}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      setMessage('Error submitting feedback.');
    }
  };

  return (
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
              onChange={handleChange}
              placeholder="Enter your username"
              required
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
  );
};

export default FeedbackForm;

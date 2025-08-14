import React, { useState, useEffect } from 'react';
import feedbackBanner from '../assets/feedback-1.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

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
  axios.get('/api/events')
      .then(res => {
        console.log("Events API Response:", res.data);
        const eventList = res.data.data || [];
        setEvents(Array.isArray(eventList) ? eventList : []);
      })
      .catch(err => console.error('Error fetching events:', err));

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
  userName: feedback.username,  
  eventid: parseInt(feedback.eventId), 
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

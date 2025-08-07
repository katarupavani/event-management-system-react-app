import React, { useState } from 'react';
import axios from 'axios';

export default function SearchEvent() {
  const [category, setCategory] = useState('');
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    if (selectedCategory !== '') {
      axios.get(`/api/events/category/${selectedCategory}`)
        .then((response) => {
          if (response.data.status === 'success') {
            setEvents(response.data.data);
            setMessage('');
          } else {
            setEvents([]);
            setMessage(response.data.message || 'No events found.');
          }
        })
        .catch((error) => {
          setEvents([]);
          setMessage('Error fetching events: ' + (error.response?.data?.message || error.message));
        });
    } else {
      setEvents([]);
      setMessage('');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Search Events by Category</h2>

      <div className="mb-3">
        <label>Select Category:</label>
        <select className="form-control" value={category} onChange={handleCategoryChange}>
          <option value="">-- Select Category --</option>
          <option value="WEDDING">Wedding</option>
          <option value="party">party</option>
          <option value="scienceconfernce">Science Conference</option>
          <option value="haldi">Haldi</option>
          <option value="Drama">Drama</option> {/* Include this if needed for your test */}
        </select>
      </div>

      {message && <div className="alert alert-info">{message}</div>}

      {events.length > 0 && (
        <div>
          <h4>Events in "{category}"</h4>
          {events.map((event, index) => (
            <div key={index} className="card mb-3 p-3">
              <h5>Event Name: {event.eventName}</h5>
              <p><strong>ID:</strong> {event.eventId}</p>
              <p><strong>Category:</strong> {event.category}</p>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Start Time:</strong> {event.startTime}</p>
              <p><strong>End Time:</strong> {event.endTime}</p>
              <p><strong>Limit:</strong> {event.limit}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SearchEvent.css';

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
    <>
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="logo-link">
          <h2 className="logo" href="/"> Event Management System</h2>
        </Link>
        <div className="nav-links">
          <Link to="/createevent">Create Event</Link>
          <Link to="/getevent">All Events</Link>
          <Link to="/searchevent">Search</Link>
          <Link to="/upcomingevent">Upcoming Events</Link>
        </div>
      </nav>

      <div className="container mt-5">
        <h2>Search Events by Category</h2>

        <div className="mb-3">
          <label>Select Category:</label>
          <select className="form-control" value={category} onChange={handleCategoryChange}>
            <option value="">-- Select Category --</option>
            <option value="Wedding">Wedding</option>
            <option value="Birthday">party</option>
            <option value="Science Conference">Science Conference</option>
            <option value="Haldi">Haldi</option>
            <option value="Drama">Drama</option>
          </select>
        </div>

        {message && <div className="alert alert-info">{message}</div>}

        {events.length > 0 && (
          <div>
            <h4>Events in "{category}"</h4>
            <div className="event-grid">
              {events.map((event, index) => (
                <div key={index} className="card p-3 event-card">
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
          </div>
        )}
      </div>
    </>
  );
}

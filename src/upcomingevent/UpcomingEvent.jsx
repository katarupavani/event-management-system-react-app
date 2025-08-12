import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UpcomingEvent.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UpcomingEvent() {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get("/api/events/upcoming")
      .then((response) => {
        if (response.data.status === "success") {
          setEvents(response.data.data);
          setMessage('');
        } else {
          setMessage(response.data.message || "No upcoming events found.");
          setEvents([]);
        }
      })
      .catch((error) => {
        setMessage("Error fetching upcoming events: " + (error.response?.data?.message || error.message));
        setEvents([]);
      });
  }, []);

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
        <h2>Upcoming Events</h2>

        {message && <div className="alert alert-info">{message}</div>}

        {events.length > 0 ? (
          <div className="row">
            {events.map((event, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card h-100 p-3 shadow-sm">
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
              </div>
            ))}
          </div>
        ) : !message && (
          <div>No upcoming events to display.</div>
        )}
      </div>
    </>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="logo-link">
          Event Management System
        </Link>
        <div className="nav-links">
          <Link to="/createevent">Create Event</Link>
          <Link to="/getevent">All Events</Link>
          <Link to="/searchevent">Search</Link>
          <Link to="/upcomingevent">Upcoming Events</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Event Management System</h1>
          <p>Your one-stop solution for managing events with ease and efficiency.</p>
          <Link to="/createevent" className="btn-primary">Get Started</Link>
        </div>
      </section>
    </>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to Event Management System</h1>
      <div style={{ marginTop: '20px' }}>
        <Link to="/createevent">
          <button>Create Event</button>
        </Link>
        <br /><br />
        <Link to="/getevent">
          <button>View All Events</button>
        </Link>
        <br /><br />
        <Link to="/searchevent">
          <button>Search Events by Category</button>
        </Link>
        <br /><br />
        <Link to="/upcomingevent">
          <button>Upcoming Events</button>
        </Link>
      </div>
    </div>
  );
}

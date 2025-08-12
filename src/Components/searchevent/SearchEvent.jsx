import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const navbarStyles = `
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
  .custom-navbar .dropdown-toggle::after {
    border-top-color: #dbe9ff;
  }
  .custom-navbar .dropdown-menu {
    background-color: #1a4fb8;
    border: none;
  }
  .custom-navbar .dropdown-item {
    color: #dbe9ff;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  .custom-navbar .dropdown-item:hover,
  .custom-navbar .dropdown-item:focus {
    background-color: #ffdd57;
    color: #1a4fb8;
  }
  .navbar-welcome-text {
    color: #ffdd57;
    font-weight: 600;
    font-size: 1rem;
    white-space: nowrap;
    margin-left: 15px;
  }
  @media (max-width: 991px) {
    .navbar-welcome-text {
      margin-top: 10px;
      margin-left: 0;
      color: #dbe9ff;
    }
  }
`;

export default function SearchEvent() {
  const [category, setCategory] = useState('');
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');

  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    window.location.href = "/home";
  };

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

  // Inject navbar styles once
  React.useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = navbarStyles;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <>
      <Navbar expand="lg" className="custom-navbar" sticky="top">
        <Container>
          <Navbar.Brand href="/organizer" className="fw-bold fs-3">Eventify</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/createvent">Create Event</Nav.Link>
              <Nav.Link href="/booking">Booking Details</Nav.Link>
              <Nav.Link href="/searchevents" active>Search Events</Nav.Link>
              <Nav.Link href="/getevent">All Events</Nav.Link>
               <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
                Logout
              </Nav.Link>
            </Nav>
             <div className="navbar-text text-white ms-auto fw-semibold fs-5">
              Welcome {username || "Guest"} 🎉
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <h2 className="mb-4 text-primary fw-bold">Search Events by Category</h2>

        <div className="mb-4">
          <label htmlFor="category-select" className="form-label fw-semibold">
            Select Category:
          </label>
          <select
            id="category-select"
            className="form-select"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">-- Select Category --</option>
            <option value="Wedding">Wedding</option>
            <option value="Birthday">Birthday</option>
            <option value="Science Conference">Science Conference</option>
            <option value="Haldi">Haldi</option>
            <option value="Drama">Drama</option>
          </select>
        </div>

        {message && <div className="alert alert-info">{message}</div>}

        {events.length > 0 && (
          <>
            <h4 className="mb-3">Events in <span className="text-secondary">"{category}"</span></h4>
            <div className="events-grid">
              {events.map((event, index) => (
                <div key={index} className="event-card p-3">
                  <h5 className="event-name">{event.eventName}</h5>
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
          </>
        )}
      </Container>

      <style>{`
        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .event-card {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgb(0 0 0 / 0.1);
          transition: box-shadow 0.3s ease;
          border: 1px solid #e0e0e0;
          min-height: 280px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .event-card:hover {
          box-shadow: 0 10px 30px rgb(0 0 0 / 0.15);
        }

        .event-name {
          color: #2d68e6;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .event-card p {
          margin: 0.25rem 0;
          font-size: 0.9rem;
          color: #444;
        }

        .form-label {
          font-size: 1rem;
        }

        .form-select {
          max-width: 300px;
          font-size: 1rem;
        }
      `}</style>
    </>
  );
}

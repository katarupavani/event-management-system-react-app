import React, { useEffect, useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Card,
  Row,
  Col,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import axios from "axios";

// You can move this CSS to a separate file (e.g. AllEvents.css)
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
`;

export default function AllEvents() {
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/home";
  };

  useEffect(() => {
    axios
      .get("/api/events")
      .then((res) => {
        if (
          res.data.status?.toLowerCase() === "success" ||
          res.data.status?.toLowerCase() === "sucess"
        ) {
          setEvents(res.data.data || []);
          setError(null);
        } else {
          setError(res.data.error_message || "Failed to fetch events");
        }
      })
      .catch(() => {
        setError("Error fetching events");
      })
      .finally(() => setLoading(false));
  }, []);

  // Inject styles on mount
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = navbarStyles;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar
        expand="lg"
        className="custom-navbar shadow-sm"
        sticky="top"
      >
        <Container>
          <Navbar.Brand href="#" className="fw-bold fs-3">
            Eventify
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="all-events-navbar" />
          <Navbar.Collapse id="all-events-navbar">
            <Nav className="me-auto">
              <Nav.Link href="/user">Home</Nav.Link>
              <Nav.Link href="/registerevent">Register for Event</Nav.Link>
              <Nav.Link href="/mybookings">Booking Details</Nav.Link>
              <Nav.Link href="/allevents" active>
                All Events
              </Nav.Link>
              
                
                 <Nav>
    <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
      Logout
    </Nav.Link>
  </Nav>
              
            </Nav>
             <div className="navbar-text text-white ms-auto fw-semibold fs-5">
              Welcome {username || "Guest"} 🎉
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="mt-5 mb-5">
        <h2 className="text-center text-primary mb-5 fw-bold fs-1 fs-md-2">
          All Events
        </h2>

        {loading && (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3 fs-5 text-secondary">Loading events...</p>
          </div>
        )}

        {error && (
          <Alert variant="danger" className="text-center fs-5 fw-semibold">
            {error}
          </Alert>
        )}

        {!loading && !error && events.length === 0 && (
          <p className="text-center fs-5 text-muted">No events available.</p>
        )}

        <Row className="gx-4 gy-5">
          {events.map((event) => {
            const eventDate = new Date(event.date);

            return (
              <Col
                key={event.eventId}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="d-flex align-items-stretch"
              >
                <Card className="custom-event-card shadow-sm rounded-4 w-100 border-0">
                  <Card.Body className="d-flex flex-column">
                    {/* Header with event name and category badge */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Card.Title className="mb-0 fs-5 fw-bold text-primary">
                        {event.eventName}
                      </Card.Title>
                      <Badge
                        bg="warning"
                        text="dark"
                        className="text-uppercase fw-semibold px-3 py-1"
                        style={{ fontSize: "0.75rem", borderRadius: "12px" }}
                      >
                        {event.category || "General"}
                      </Badge>
                    </div>

                    {/* Date & Location */}
                    <div className="mb-3">
                      <p
                        className="mb-1 fw-semibold text-muted"
                        style={{ fontSize: "0.85rem" }}
                      >
                        📅 Date
                      </p>
                      <p className="mb-2 fs-6">
                        {eventDate.toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>

                      <p
                        className="mb-1 fw-semibold text-muted"
                        style={{ fontSize: "0.85rem" }}
                      >
                        📍 Location
                      </p>
                      <p className="mb-0 fs-6">{event.location || "Not specified"}</p>
                    </div>

                    {/* Description */}
                    <div className="mb-3 flex-grow-1">
                      <p
                        className="fw-semibold text-muted"
                        style={{ fontSize: "0.85rem" }}
                      >
                        📝 Description
                      </p>
                      <p
                        className="fs-6 text-truncate"
                        style={{ maxHeight: "5rem", overflow: "hidden" }}
                      >
                        {event.description || "No description available."}
                      </p>
                    </div>
   <div>
  <p className="fw-semibold text-muted d-flex align-items-center" style={{ fontSize: "0.85rem", gap: "0.4rem" }}>
    <i className="bi bi-clock"></i> Timings
  </p>
  <p className="fs-6">
    {event.startTime && event.endTime ? `${event.startTime} - ${event.endTime}` : "NA"}
  </p>
</div>


                    {/* Event Limit */}
                    <div>
                      <p
                        className="fw-semibold text-muted"
                        style={{ fontSize: "0.85rem" }}
                      >
                        👥 Participant Limit
                      </p>
                      <p className="fs-6">{event.limit || "No limit"}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

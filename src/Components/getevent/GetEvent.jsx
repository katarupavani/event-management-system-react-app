import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Alert,
  Button,
  Navbar,
  Nav,
  NavDropdown,
  Spinner,
  Modal,
  Badge,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Same navbar styles as AllEvents
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
  .custom-event-card {
    border: none;
    border-radius: 1rem;
    transition: transform 0.3s ease;
  }
  .custom-event-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(45, 104, 230, 0.3);
  }
`;

export default function GetEvent() {
  const [events, setEvents] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState(null);

  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/home";
  };

  useEffect(() => {
    // Inject styles on mount
    const styleTag = document.createElement("style");
    styleTag.innerHTML = navbarStyles;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setLoading(true);
    try {
      const resp = await axios.get("/api/events");
      const status = resp.data?.status?.toLowerCase();
      if (status === "success" || status === "sucess") {
        setEvents(resp.data.data);
        setErrorMsg("");
      } else {
        setErrorMsg(
          resp.data?.error_message || `Failed to fetch events. Status: ${resp.data?.status}`
        );
      }
    } catch (error) {
      setErrorMsg("Server error. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Format date nicely
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format time (assuming 24-hour string like '14:00')
  const formatTime = (timeStr) => {
    if (!timeStr) return "N/A";
    const [hour, minute] = timeStr.split(":");
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const confirmDelete = (id) => {
    setDeleteEventId(id);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setDeleteEventId(null);
    setShowDeleteModal(false);
  };

  const deleteEvent = async () => {
    if (!deleteEventId) return;
    try {
      const response = await axios.delete(`/api/events/${deleteEventId}`);
      if (response.data?.status === "success") {
        setEvents(events.filter((event) => event.eventId !== deleteEventId));
        setShowDeleteModal(false);
      } else {
        alert(response.data?.error_message || "Failed to delete event.");
      }
    } catch (error) {
      alert("Error deleting event.");
    }
  };

  const updateEvent = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" className="custom-navbar shadow-sm" sticky="top">
        <Container>
          <Navbar.Brand href="/organizer" className="fw-bold fs-3">
            Eventify
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarEvents" />
          <Navbar.Collapse id="navbarEvents">
            <Nav className="me-auto">
              <Nav.Link href="/createvent">Create Event</Nav.Link>
              <Nav.Link href="/booking">Booking Details</Nav.Link>
              <Nav.Link href="/searchevents">Search Events</Nav.Link>
              <Nav.Link href="/getevent" active>
                All Events
              </Nav.Link>
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

        {errorMsg && (
          <Alert variant="danger" className="text-center fs-5 fw-semibold">
            {errorMsg}
          </Alert>
        )}

        {!loading && !errorMsg && events.length === 0 && (
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
                <Card className="custom-event-card shadow-sm rounded-4 w-100">
                  <Card.Body className="d-flex flex-column">
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

                    <div className="mb-3">
                      <p
                        className="mb-1 fw-semibold text-muted"
                        style={{ fontSize: "0.85rem" }}
                      >
                        📅 Date & Time
                      </p>
                      <p className="mb-2 fs-6">
                        {formatDate(event.date)} | {formatTime(event.startTime)} - {formatTime(event.endTime)}
                      </p>

                      <p
                        className="mb-1 fw-semibold text-muted"
                        style={{ fontSize: "0.85rem" }}
                      >
                        📍 Location
                      </p>
                      <p className="mb-0 fs-6">{event.location || "Not specified"}</p>
                    </div>

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
                      <p
                        className="fw-semibold text-muted"
                        style={{ fontSize: "0.85rem" }}
                      >
                        👥 Participant Limit
                      </p>
                      <p className="fs-6">{event.limit || "No limit"}</p>
                    </div>

                    <div className="d-flex justify-content-between mt-3">
                      <Button
                        variant="danger"
                        onClick={() => confirmDelete(event.eventId)}
                        size="sm"
                      >
                        Delete
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => updateEvent(event.eventId)}
                        size="sm"
                      >
                        Update
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this event? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteEvent}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

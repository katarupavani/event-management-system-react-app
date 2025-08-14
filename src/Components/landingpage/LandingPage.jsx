import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="page-wrapper">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">Welcome to Eventify</h1>
        <p className="hero-subtitle">
          Simplify how you plan, manage, and attend events — all in one place.
        </p>
        <div className="hero-buttons">
          <Button as={Link} to="/login" className="btn-primary">
            Get Started
          </Button>
          <Button
            as={Link}
            to="/allevents"
            variant="outline-light"
            className="btn-secondary"
          >
            Explore Events
          </Button>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="features-section">
        <Container>
          <h2 className="section-title text-center">What We Offer</h2>
          <Row className="mt-4">
            <Col md={4} className="feature-box">
              <i className="bi bi-calendar2-event feature-icon"></i>
              <h4>Event Creation</h4>
              <p>Create and manage your own events with our easy-to-use tools.</p>
            </Col>
            <Col md={4} className="feature-box">
              <i className="bi bi-person-check feature-icon"></i>
              <h4>Easy Registration</h4>
              <p>Register for events in just a few clicks — fast and secure.</p>
            </Col>
            <Col md={4} className="feature-box">
              <i className="bi bi-bar-chart-fill feature-icon"></i>
              <h4>Booking Insights</h4>
              <p>Track bookings and monitor trends.</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="footer">
        <Container>
          <Row>
            <Col md={6} className="footer-text">
              © 2025 Eventify. All rights reserved.
            </Col>
            <Col md={6} className="footer-links">
              <Link to="/about" className="footer-link">About</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
              <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

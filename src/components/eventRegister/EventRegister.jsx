import React from 'react'
import { Nav } from 'react-bootstrap'
import { Navbar } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';

export default function EventRegister() {
  return (
    <div>
        
        
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                  <Navbar.Brand href="#home">Events</Navbar.Brand>
                  <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="/event-register">Register for Event</Nav.Link>
                    <Nav.Link href="">Booking Details</Nav.Link>
                  </Nav>
                </Container>
              </Navbar>
        
        EventRegister</div>
  )
}

import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default function Home() {
  return (
     
    <Nav defaultActiveKey="/home" as="ul">
      <Nav.Item as="li">
        <Nav.Link href="/home">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
         <Nav.Link as={Link} to="/login">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
       <Nav.Link as={Link} to="/register">Register</Nav.Link>
      </Nav.Item>
    </Nav>
  );
  
}
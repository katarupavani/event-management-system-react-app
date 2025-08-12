import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Container,
  Spinner,
  Alert
} from 'react-bootstrap';

export default function OrganizerProfile() {
  const [organizer, setOrganizer] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    if (role !== 'organizer') {
      alert("You're not an organizer");
      navigate('/');
      return;
    }

    setLoading(true);
    setError('');

    axios.get(`/api/users/${userId}`)
      .then(response => {
        if (response.data.status === 'success') {
          setOrganizer(response.data.data);
        } else {
          setError(response.data.message || 'Failed to load organizer profile');
        }
      })
      .catch(() => setError('Error fetching organizer profile'))
      .finally(() => setLoading(false));
  }, [userId, role, navigate]);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-3">Loading...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card className="shadow">
        <Card.Body>
          <Card.Title className="text-center mb-4">Organizer Profile</Card.Title>
          <p><strong>Organizer Name:</strong> {organizer.username}</p>
          <p><strong>Email:</strong> {organizer.email}</p>
          <div className="text-center mt-4">
            <Button variant="primary" onClick={() => navigate('/editorganizerprofile')}>
              Edit Profile
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

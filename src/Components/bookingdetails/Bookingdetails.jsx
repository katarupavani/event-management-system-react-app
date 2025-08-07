import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (username) {
      axios.get(`/api/bookings/username/${username}`)
        .then((res) => {
          if (res.data.status === 'success') {
            setBookings(res.data.data);
          } else {
            setError(res.data.message);
          }
        })
        .catch((err) => {
          setError('Error fetching bookings: ' + err.message);
        });
    }
  }, [username]);

  if (!username) return <p>Please log in to view your bookings.</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Event Date</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.bookId}>
                <td>{booking.event.eventName}</td>
                <td>{booking.event.date}</td>
                <td>{booking.event.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

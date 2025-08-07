import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateBooking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [events, setEvents] = useState([]);

  // Fetch the booking by ID
  useEffect(() => {
    fetch(`/api/bookings/book/alternate/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setBooking(data.data);
        } else {
          console.error('Failed to load booking');
        }
      })
      .catch((err) => console.error('Error:', err));
  }, [id]);

  // Fetch all events
  useEffect(() => {
    fetch(`/api/bookings`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          const uniqueEvents = data.data
            .map((b) => b.event)
            .filter(
              (event, index, self) =>
                index === self.findIndex((e) => e.eventId === event.eventId)
            );
          setEvents(uniqueEvents);
        }
      })
      .catch((err) => console.error('Error fetching events:', err));
  }, []);

  const handleEventChange = (e) => {
    const selectedEventId = parseInt(e.target.value);
    const selectedEvent = events.find((event) => event.eventId === selectedEventId);
    if (selectedEvent) {
      setBooking((prev) => ({
        ...prev,
        event: selectedEvent,
      }));
    }
  };

  const handleUpdate = async () => {
    if (!booking || !booking.bookId) return;

    // Build simplified payload
    const updatedBooking = {
      bookId: booking.bookId,
      userId: booking.user.userId,
      eventId: booking.event.eventId,
    };

    try {
      const res = await fetch(`/api/bookings/update/${booking.bookId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBooking),
      });

      if (res.ok) {
        alert('Booking updated successfully');
        navigate('/');
      } else {
        const err = await res.json();
        alert('Update failed: ' + err.message || 'Unknown error');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Something went wrong.');
    }
  };

  if (!booking) return <div>Loading booking...</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-primary">Update Booking</h2>

      {/* Username (readonly) */}
      <input
        className="form-control mb-3"
        value={booking.user?.username || ''}
        disabled
        placeholder="Username"
      />

      {/* Event Dropdown */}
      <select
        className="form-control mb-3"
        value={booking.event?.eventId || ''}
        onChange={handleEventChange}
      >
        <option value="">-- Select Event --</option>
        {events.map((event) => (
          <option key={event.eventId} value={event.eventId}>
            {event.eventName} ({event.date})
          </option>
        ))}
      </select>

      <button className="btn btn-success" onClick={handleUpdate}>
        Update Booking
      </button>
    </div>
  );
}

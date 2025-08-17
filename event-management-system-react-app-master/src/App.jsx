import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EventRegister from './components/registerforevent/RegisterForevent';
import UpdateBooking from './components/update/UpdateEvent.jsx';
import GetBookings from './components/bookingdetails/Bookingdetails.jsx'; // <-- make sure you import this

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetBookings />} />
          <Route path="/event-register" element={<EventRegister />} />
          <Route path="/update/:id" element={<UpdateBooking />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

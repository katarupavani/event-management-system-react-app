import 'bootstrap/dist/css/bootstrap.min.css'
<<<<<<< HEAD
import { useState } from 'react'
import './App.css'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import EventRegister from './components/eventRegister/EventRegister'
import BookEvent from './components/bookEvents/BookEvent'
import UpdateBookedEvents from './components/updatebookedEvents/UpdateBookEvent'
=======
import './App.css'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import EventRegister from './components/eventRegister/EventRegister'
import GetBookings from './components/bookEvents/GetBookings'
>>>>>>> cd4033f2b8348d954ddfb0dea896a2a0af570e5d

function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
<<<<<<< HEAD
      <Route path="" element={<BookEvent/>}></Route>
=======
      <Route path="/" element={<GetBookings/>}></Route>
>>>>>>> cd4033f2b8348d954ddfb0dea896a2a0af570e5d
      <Route path='/event-register' element={<EventRegister/>}></Route>
      <Route path='/update/:id' element={<UpdateBookedEvents />} />
     </Routes>
     </BrowserRouter>
     <Outlet></Outlet>
    </>
  )
}

export default App

import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import './App.css'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import EventRegister from './components/eventRegister/EventRegister'
import BookEvent from './components/bookEvents/BookEvent'
import UpdateBookedEvents from './components/updatebookedEvents/UpdateBookEvent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="" element={<BookEvent/>}></Route>
      <Route path='/event-register' element={<EventRegister/>}></Route>
      <Route path='/update/:id' element={<UpdateBookedEvents />} />
     </Routes>
     </BrowserRouter>
     <Outlet></Outlet>
    </>
  )
}

export default App

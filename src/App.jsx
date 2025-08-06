import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import EventRegister from './components/eventRegister/EventRegister'
import GetBookings from './components/bookEvents/GetBookings'

function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<GetBookings/>}></Route>
      <Route path='/event-register' element={<EventRegister/>}></Route>
     </Routes>
     </BrowserRouter>
     <Outlet></Outlet>
    </>
  )
}

export default App

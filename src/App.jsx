import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GetEvent from './components/bookEvents/GetEvent'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import EventRegister from './components/eventRegister/EventRegister'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="" element={<GetEvent/>}></Route>
      <Route path='/event-register' element={<EventRegister/>}></Route>
     </Routes>
     </BrowserRouter>
     <Outlet></Outlet>
    </>
  )
}

export default App

import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Components/login/Login'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Home from './home/Home'
import Register from './register/Register'
import User from "./Components/login/user/User"
import RegisterForevent from "./Components/registerforevent/RegisterForevent"
import MyBookings from "./Components/bookingdetails/Bookingdetails"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
       <Route path="/user" element={<User/>}/>
       <Route path="/registerevent" element={<RegisterForevent/>}/>
       <Route path="/mybookings" element={<MyBookings/>}/>
      
    </Routes>
   </BrowserRouter>
   <Outlet></Outlet>
    </div>
      
  )
}

export default App

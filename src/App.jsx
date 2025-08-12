import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css';

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
import Profile from "./Components/profile/Profile"
import Organizer from "./Components/organizer/Organizer"
import CreateEvent from "./Components/createevent/CreateEvent"
import BookEvent from "./Components/booking/Booking"
import UpdateEvent from "./Components/update/UpdateEvent"
import GetEvent from "./Components/getevent/GetEvent"
import UpdateEventOrg from "./Components/updateevent/UpdateEventOrg"
import SearchEvent from "./Components/searchevent/SearchEvent"
import OrganizerProfile from "./Components/organizerprofile/OrganizerProfile"
import AllEvents from "./Components/allevents/AllEvents"
import FeedBackForm from "./Components/feedback/FeedBackForm"
import Testimonials from "./Components/testimonials/Testimonials"
import LandingPage from "./Components/landingpage/LandingPage";




function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
       <Route path="/user" element={<User/>}/>
       <Route path="/registerevent" element={<RegisterForevent/>}/>
       <Route path="/mybookings" element={<MyBookings/>}/>
        <Route path="/viewprofile" element={<Profile/>}/>
        <Route path="/organizer" element={<Organizer/>}/>
         <Route path="/createvent" element={<CreateEvent/>}/>
          <Route path="/booking" element={<BookEvent/>}/>
        <Route path="/" element={<BookEvent/>}></Route>
      <Route path='/booking/update/:id' element={<UpdateEvent/>} />
       <Route path="/getevent" element={<GetEvent/>}></Route>
       <Route path="update/:id" element={<UpdateEventOrg />} />
        <Route path="/searchevents" element={<SearchEvent/>}></Route>
        <Route path="/vieworgprofile" element={<OrganizerProfile/>}></Route>
          <Route path="/allevents" element={<AllEvents/>}></Route>
          <Route path="/feedback" element={<FeedBackForm/>}></Route>
          <Route path="/testimonials" element={<Testimonials/>}></Route>
          <Route path="/page" element={<LandingPage/>}></Route>
         



        
      
    </Routes>
   </BrowserRouter>
   <Outlet></Outlet>
    </div>
      
  )
}

export default App

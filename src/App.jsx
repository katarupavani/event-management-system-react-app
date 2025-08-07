import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Home from './home/Home'
import CreateEvent from './createevent/CreateEvent'
import GetEvent from './getevent/GetEvent'
import SearchEvent from './searchevent/SearchEvent'
import UpcomingEvent from './upcomingevent/UpcomingEvent'
import UpdateEvent from "./updateevent/UpdateEvent"


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      
      <BrowserRouter>
      <Routes>
      <Route path="/"element={<Home/>}></Route>
      <Route path="createevent"element={<CreateEvent/>}></Route>
     <Route path="getevent" element={<GetEvent/>}></Route>
     <Route path="searchevent" element={<SearchEvent/>}></Route>
     <Route path="upcomingevent" element={<UpcomingEvent/>}></Route>
    <Route path="update/:id" element={<UpdateEvent />} />
      </Routes>
    </BrowserRouter>
    <Outlet></Outlet>
    </div>)
}

export default App

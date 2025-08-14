import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'

import './App.css'
import FeedbackForm from './feedbackform/FeedbackForm'
import Testimonials from './testimonials/Testimonials';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
   <FeedbackForm></FeedbackForm>
   <Testimonials></Testimonials>
   </div>
  )
}

export default App

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'

import './App.css'
import FeedbackForm from './feedbackform/FeedbackForm'

function App() {
  const [count, setCount] = useState(0)

  return (
   <FeedbackForm></FeedbackForm>
  )
}

export default App

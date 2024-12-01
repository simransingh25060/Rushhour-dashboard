import { useState } from 'react'
import Timer from './components/timer'
import './App.css'
// import {Route,Routes} from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      {/* <Routes>
      <Route path="/timer" element={<Timer/>} />
    </Routes> */}
    <Timer/>
      </div>
        
    </>
  )
}

export default App

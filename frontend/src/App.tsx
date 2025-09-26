
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import GetStarted from './pages/GetStarted'
import BettingForm from './pages/BetForm'
import Login from './pages/Login'
function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/getstarted" element={<GetStarted />} />
        <Route path="/betform" element={<BettingForm />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </Router>
  )
}

export default App

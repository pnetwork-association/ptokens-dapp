import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import './App.css'
import Navbar from './components/organisms/Navbar'
import Swap from './components/views/Swap'
import Activity from './components/views/Activity'
import Risks from './components/views/Risks'

const App = (): JSX.Element => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/swap" element={<Swap />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/risks" element={<Risks />} />
        <Route path="/" element={<Navigate to="/swap" replace />} />
      </Routes>
    </Router>
  )
}

export default App
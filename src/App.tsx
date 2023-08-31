import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import './App.css'
import Navbar from './components/organisms/Navbar'
import Risks from './components/views/Risks'
import Swap from './components/views/Swap'

const App = (): JSX.Element => {
  return (
    <Router>
      {<Navbar />}
      <Routes>
        <Route path="/swap" element={<Swap />} />
        <Route path="/risks" element={<Risks />} />
        <Route path="/" element={<Navigate to="/swap" replace />} />
      </Routes>
    </Router>
  )
}

export default App
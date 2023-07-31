import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Swap from './components/views/Swap'
import Risks from './components/views/Risks'
import Header from './components/organisms/Header'

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/swap" element={<Swap />} />
        <Route path="/risks" element={<Risks />} />
        <Route path="/" element={<Navigate to="/swap" replace />} />
      </Routes>
    </Router>
  )
}

export default App
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { RiFeedbackLine } from "react-icons/ri"

import './App.css'
import Navbar from './components/organisms/Navbar'
import Swap from './components/views/Swap'
// import Activity from './components/views/Activity'
import Risks from './components/views/Risks'

const App = (): JSX.Element => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/swap" element={<Swap />} />
        {/* <Route path="/activity" element={<Activity />} /> */}
        <Route path="/risks" element={<Risks />} />
        <Route path="/" element={<Navigate to="/swap" replace />} />
      </Routes>
      <div className="toast">
        <div className="alert rounded-lg">
          <button className='flex' data-tally-open="3yJOxg" data-tally data-tally-align-left="1" data-tally-hide-title="1" data-tally-overlay="1" data-tally-auto-close="1000">
            <RiFeedbackLine size={'24'}/> 
            <div className='ml-2'>
              Feedback? Let us know!
            </div>
          </button>
        </div>
      </div>
    </Router>
  )
}

export default App
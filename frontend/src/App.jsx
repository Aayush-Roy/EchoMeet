import React from 'react'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Authentication from './pages/Authentication.jsx';
const App = () => {
  return (
    <div className=''>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/auth' element={<Authentication/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

import React from 'react'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Authentication from './pages/Authentication.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Home from './pages/Home.jsx';
const App = () => {
  return (
    <div className=''>
      <Router>
        <AuthProvider>
        <Routes>
          <Route path='/home' element={<Home/>} />
          <Route path='/' element={<LandingPage/>} />
          <Route path='/auth' element={<Authentication/>} />
        </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App

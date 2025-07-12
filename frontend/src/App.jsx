import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={ <PrivateRoute> <Home /> </PrivateRoute> } />
      </Routes>
    </Router>
  )
}

export default App;

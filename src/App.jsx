import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';
import Header from './Components/Header';
import SignIn from './Pages/auth/Signin';
import SignUp from './Pages/auth/Signup';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className='w-screen h-screen bg-black overflow-x-hidden'>
      <Router>
        <Header isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path='/' element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <HomePage />
            </ProtectedRoute>
          } exact />
          <Route path='/CoinPage/:id' element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CoinPage />
            </ProtectedRoute>
          } />
          <Route path='/signin' element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

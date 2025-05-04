import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/index"

import './App.css';
import NavBar from './components/nav';
import VenuePage from './pages/venue';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/venue' element={<VenuePage />} />
        <Route path='/profile' element={<ProfilePage />} />
        
      </Routes>
    </>
  );
}

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/index"

import './App.css';
import NavBar from './components/nav';
import VenuePage from './pages/venue';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import NewVenuePage from './pages/newVenuePage';
import EditVenuePage from './pages/editVenuePage';

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/venue/:id' element={<VenuePage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/venues/new' element={<NewVenuePage />} />
        <Route path='/venues/:id/edit' element={<EditVenuePage />} />
        
      </Routes>
    </>
  );
}

export default App;

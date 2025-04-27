import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/index"

import './App.css';
import NavBar from './components/nav';
import VenuePage from './pages/venue';

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage />} /
        >
        <Route path='/venue' element={<VenuePage />} /
        >
      </Routes>
    </>
  );
}

export default App;

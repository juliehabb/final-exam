import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/index"

import './App.css';
import NavBar from './components/nav';

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;

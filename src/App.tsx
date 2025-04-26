import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/index"

import './App.css';

function App() {
  return (
    <>
      <h1>Hello</h1>
      <h2>Dette er en h2</h2>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;

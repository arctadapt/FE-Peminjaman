import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

import Dashboard from './pages/Dashboard';
import Peminjaman from './pages/Peminjaman';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/peminjaman" element={<Peminjaman />} />
      </Routes>
    </Router>
  );
}

export default App;

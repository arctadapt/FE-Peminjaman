import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Peminjaman from './pages/Peminjaman';
import Riwayat from './pages/Riwayat';
import Tersedia from './pages/Tersedia';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>  
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/peminjaman" element={<Peminjaman />} />
              <Route path="/riwayat" element={<Riwayat />} />
              <Route path="/tersedia" element={<Tersedia />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
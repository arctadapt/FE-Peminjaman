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
import ProtectedRoute from './components/ProtectedRoute';
import Request from './pages/Request';
import ListNotifikasi from './pages/ListNotifikasi';
import Pengembalian from './pages/Pengembalian';
import AddForm from './pages/Tambah';

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
              <Route path="/profile" element={<Profile />} />
              <Route path="/request" element={<Request />} />
              <Route path="/listnotifikasi" element={<ListNotifikasi />} />
              <Route path="/kembali" element={<Pengembalian />} />
              <Route path="/tambah" element={<AddForm />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
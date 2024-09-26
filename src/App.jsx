import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Peminjaman from './pages/Peminjaman';
import LandingPage from './pages/LandingPage';
import Riwayat from './pages/Riwayat';
import Tersedia from './pages/Tersedia';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function App() {
  const [availableItems, setAvailableItems] = useState([
    { id: 1, name: 'Bola Basket', stock: 3 },
    { id: 2, name: 'Bola Futsal', stock: 2 },
    { id: 3, name: 'Matras', stock: 2 },
    { id: 4, name: 'Proyektor', stock: 6 },
  ]);

  const [history, setHistory] = useState([]);

  const [activeLoans, setActiveLoans] = useState([]);

  const handleBorrowItem = (borrowedItems, newHistoryEntry) => {
    if (borrowedItems.length > 0) {
      borrowedItems.forEach(itemName => {
        setAvailableItems(prevItems => {
          const updatedItems = prevItems.map(item => {
            if (item.name === itemName) {
              console.log(`Borrowing item: ${item.name}, previous stock: ${item.stock}`);
              return { ...item, stock: item.stock - 1 };
            }
            return item;
          });
          console.log('Updated available items:', updatedItems);
          return updatedItems;
        });
      });
    }
  
    setHistory(prevHistory => [...prevHistory, newHistoryEntry]);
    setActiveLoans(prevLoans => [...prevLoans, newHistoryEntry]);
  };
  
  const handleReturnItem = (returnedItemName) => {
    setAvailableItems(prevAvailableItems => 
      prevAvailableItems.map(item => {
        if (item.name === returnedItemName) {
          return { ...item, stock: item.stock + 1 };
        }
        return item;
      })
    );
  
    setActiveLoans(prevActiveLoans => 
      prevActiveLoans.filter(loan => loan.barangDipinjam !== returnedItemName)
    );
  
    setHistory(prevHistory => 
      prevHistory.map(entry => {
        if (entry.barangDipinjam === returnedItemName) {
          return { ...entry, returned: true }; 
        }
        return entry;
      })
    );
  };
  
  return (
    <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>  
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/peminjaman" element={<Peminjaman availableItems={availableItems} onBorrow={handleBorrowItem} />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/riwayat" element={<Riwayat history={history} activeLoans={activeLoans} onReturn={handleReturnItem} />} />
          <Route path="/tersedia" element={<Tersedia availableItems={availableItems} />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;

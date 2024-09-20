import React from 'react';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const navigate = useNavigate();

  const handleStartBorrowing = () => {
    navigate('/peminjaman');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-gray-200 p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700 transition">Home</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700 transition">Peminjaman</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700 transition">Riwayat Peminjaman</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700 transition">Barang Tersedia</a>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10 text-gray-200">
        <div className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-extrabold mb-4">Selamat Datang di Website Peminjaman Barang</h1>
          <p className="text-lg text-gray-400 mb-6">
            Kelola peminjaman barang-barang sekolah seperti bola, raket, net, dan barang lainnya dengan mudah dan cepat.
          </p>

          <div className="grid grid-cols-1 gap-4 mb-6">
            <div className="p-4 bg-gray-800 rounded-md shadow-md">
              <h3 className="text-lg font-semibold text-blue-400">Barang yang Tersedia</h3>
              <p className="text-sm text-gray-400">Kelola dan lacak peminjaman barang-barang yang ada di sekolah.</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-md shadow-md">
              <h3 className="text-lg font-semibold text-blue-400">Peminjaman Aktif</h3>
              <p className="text-sm text-gray-400">Lihat status peminjaman yang sedang berlangsung.</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-md shadow-md">
              <h3 className="text-lg font-semibold text-blue-400">Riwayat Peminjaman</h3>
              <p className="text-sm text-gray-400">Lihat riwayat peminjaman barang-barang sekolah.</p>
            </div>
          </div>

          <button
            onClick={handleStartBorrowing}
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
          >
            Mulai Meminjam
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

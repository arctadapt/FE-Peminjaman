import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleStartBorrowing = () => {
    navigate('/peminjaman');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-700 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-gray-200 p-6 shadow-lg flex flex-col">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-400">Dashboard</h2>
        <ul className="space-y-4 flex-grow">
          {['Home', 'Peminjaman', 'Riwayat Peminjaman', 'Barang Tersedia'].map((item) => (
            <li key={item}>
              <a
                href="#"
                className="block py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300 text-lg font-semibold hover:shadow-md"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <a
            href="/login"
            className="block py-3 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition duration-300 text-lg font-semibold text-center"
          >
            Logout
          </a>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10 text-gray-200">
        <div className="max-w-5xl mx-auto bg-gray-900 p-8 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105">
          <h1 className="text-5xl font-extrabold mb-6 text-blue-400">Selamat Datang di Website Peminjaman Barang</h1>
          <p className="text-lg text-gray-400 mb-10">
            Kelola peminjaman barang-barang sekolah dengan mudah dan cepat.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-6">
            {[
              {
                title: 'Barang yang Tersedia',
                description: 'Lacak peminjaman barang-barang yang ada di sekolah.',
                bgClass: 'bg-gradient-to-r from-blue-500 to-blue-700',
              },
              {
                title: 'Peminjaman Aktif',
                description: 'Lihat status peminjaman yang sedang berlangsung.',
                bgClass: 'bg-gradient-to-r from-green-500 to-green-700',
              },
              {
                title: 'Riwayat Peminjaman',
                description: 'Lihat riwayat peminjaman barang-barang sekolah.',
                bgClass: 'bg-gradient-to-r from-purple-500 to-purple-700',
              },
            ].map((card, index) => (
              <div key={index} className={`p-6 ${card.bgClass} rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl`}>
                <h3 className="text-xl font-bold text-white">{card.title}</h3>
                <p className="text-sm text-gray-200 mt-2">{card.description}</p>
                <div className="mt-4">
                  <div className="h-1 w-24 bg-white rounded"></div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleStartBorrowing}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-1 hover:shadow-xl"
          >
            Mulai Meminjam
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

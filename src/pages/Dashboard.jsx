import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClipboardList, FaHistory } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleStartBorrowing = () => {
    navigate('/peminjaman');
  };

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: "url('background.png')" }}>
      <main className="flex-1 p-6 sm:p-12 bg- bg-opacity-80 rounded-lg shadow-lg">
        <div className="max-w-7xl mx-auto">
          <section className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 sm:p-14 rounded-3xl shadow-xl mb-6 sm:mb-12 duration-500 hover:bg-blue-700 transform hover:-translate-y-2 border-4 border-blue-500">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 sm:mb-6">Selamat Datang di Peminjaman Barang</h1>
            <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8">Kelola peminjaman barang-barang sekolah dengan mudah dan cepat.</p>
            <button
              onClick={handleStartBorrowing}
              className="px-6 py-3 sm:px-10 sm:py-4 bg-white text-blue-800 font-bold rounded-2xl shadow-lg hover:bg-gray-300 transition-transform duration-300 transform"
            >
              Mulai Meminjam
            </button>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12">
            {[{
                title: 'Barang yang Tersedia',
                description: 'Lacak peminjaman barang-barang yang ada di sekolah.',
                bgClass: 'bg-yellow-500',
                icon: <FaClipboardList />,
                path: '/tersedia'
              },
              {
                title: 'Riwayat Peminjaman',
                description: 'Lihat riwayat peminjaman barang-barang sekolah.',
                bgClass: 'bg-teal-600',
                icon: <FaHistory />,
                path: '/riwayat' 
              },
            ].map((card, index) => (
              <div
                key={index}
                className={`p-6 sm:p-8 ${card.bgClass} rounded-3xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl hover:-translate-y-2 border-4 border-white border-opacity-30 cursor-pointer`}
                onClick={() => navigate(card.path)}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl sm:text-4xl text-white">{card.icon}</div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">{card.title}</h3>
                    <p className="text-sm sm:text-base text-gray-300 mt-2">{card.description}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="h-1 w-full bg-white rounded-full opacity-75"></div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

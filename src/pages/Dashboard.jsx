import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaClipboardList, FaBoxOpen, FaHistory } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleStartBorrowing = () => {
    navigate('/peminjaman');
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-800 to-gray-900 text-gray-200">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-gradient-to-br from-purple-700 to-blue-900 text-white p-6 flex flex-col shadow-2xl">
        <h2 className="text-4xl font-semibold mb-10 text-center">Dashboard</h2>
        <nav>
          <ul className="space-y-6">
            {[
              { name: 'Home', icon: <FaHome /> },
              { name: 'Peminjaman', icon: <FaBoxOpen /> },
              { name: 'Riwayat', icon: <FaHistory /> },
              { name: 'Tersedia', icon: <FaClipboardList /> },
            ].map((item, index) => (
              <li key={index}>
                <button
                  className="w-full py-4 px-6 rounded-lg flex items-center gap-3 text-lg font-medium bg-transparent hover:bg-purple-600 hover:bg-opacity-50 transition-all duration-300"
                  onClick={() => navigate(item.name === 'Home' ? '/' : `/${item.name.toLowerCase().replace(/\s+/g, '')}`)}
                >
                  {item.icon} <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto">
          <button
            className="block w-full py-4 px-6 bg-red-600 hover:bg-red-700 rounded-lg text-center font-semibold transition duration-300"
            onClick={() => navigate('/login')}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-12">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <section className="bg-gradient-to-br from-purple-600 to-blue-800 p-14 rounded-3xl shadow-2xl mb-12">
            <h1 className="text-5xl font-extrabold text-white mb-6">Selamat Datang di Peminjaman Barang</h1>
            <p className="text-lg text-gray-300 mb-8">Kelola peminjaman barang-barang sekolah dengan mudah dan cepat.</p>
            <button
              onClick={handleStartBorrowing}
              className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-800 text-white font-semibold rounded-2xl shadow-lg hover:from-blue-700 hover:to-purple-900 transition-all duration-300 transform hover:scale-105"
            >
              Mulai Meminjam
            </button>
          </section>

          {/* Dashboard Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                title: 'Barang yang Tersedia',
                description: 'Lacak peminjaman barang-barang yang ada di sekolah.',
                bgClass: 'bg-gradient-to-r from-blue-500 to-blue-700',
                icon: <FaClipboardList />,
              },
              {
                title: 'Peminjaman Aktif',
                description: 'Lihat status peminjaman yang sedang berlangsung.',
                bgClass: 'bg-gradient-to-r from-green-500 to-green-700',
                icon: <FaBoxOpen />,
              },
              {
                title: 'Riwayat Peminjaman',
                description: 'Lihat riwayat peminjaman barang-barang sekolah.',
                bgClass: 'bg-gradient-to-r from-purple-500 to-purple-700',
                icon: <FaHistory />,
              },
            ].map((card, index) => (
              <div
                key={index}
                className={`p-8 ${card.bgClass} rounded-2xl shadow-2xl transition-transform transform hover:scale-105 hover:shadow-xl`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-4xl text-white">{card.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                    <p className="text-base text-gray-200 mt-2">{card.description}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="h-1 w-50 bg-white rounded-full"></div>
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

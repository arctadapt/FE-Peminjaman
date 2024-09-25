import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaClipboardList, FaBoxOpen, FaHistory, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleStartBorrowing = () => {
    navigate('/peminjaman');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-gray-200">
      <aside className="w-full md:w-64 h-auto md:h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-white p-6 flex flex-col shadow-lg border-r-4 border-blue-500">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            Dashboard
          </h2>
          <div className="h-1 bg-blue-500 rounded-full opacity-75 mt-3 mx-auto"></div>
        </div>

        <nav className="flex-grow">
          <ul className="space-y-4">
            {[
              { name: 'Home', icon: <FaHome />, path: '/dashboard' },
              { name: 'Peminjaman', icon: <FaBoxOpen />, path: '/peminjaman' },
              { name: 'Riwayat', icon: <FaHistory />, path: '/riwayat' },
              { name: 'Tersedia', icon: <FaClipboardList />, path: '/tersedia' },
            ].map((item, index) => (
              <li key={index}>
                <button
                  className="w-full py-4 px-4 flex items-center gap-3 text-lg font-medium bg-transparent hover:bg-blue-800 rounded-lg transition-all duration-300 transform hover:scale-105"
                  onClick={() => navigate(item.path)}
                >
                  <div className="text-2xl">{item.icon}</div>
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8">
          <div className="flex items-center gap-4 p-4 bg-blue-800 rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-900" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <FaUser className="text-2xl" />
            <div>
              <h3 className="text-lg font-semibold">Zeta Lawrance</h3>
              <p className="text-sm text-gray-400">Administrator</p>
            </div>
          </div>
          {showProfileMenu && (
            <div className="bg-blue-700 mt-2 rounded-lg p-2 space-y-2">
              <button className="flex items-center gap-3 p-2 w-full hover:bg-blue-600 rounded-md transition" onClick={() => navigate('/profile')}>
                <FaUser className="text-xl" />
                <span>View Profile</span>
              </button>
              <button className="flex items-center gap-3 p-2 w-full hover:bg-blue-600 rounded-md transition" onClick={() => navigate('/settings')}>
                <FaCog className="text-xl" />
                <span>Settings</span>
              </button>
              <button className="flex items-center gap-3 p-2 w-full hover:bg-red-600 rounded-md transition" onClick={() => navigate('/login')}>
                <FaSignOutAlt className="text-xl" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 p-6 sm:p-12 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <section className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 sm:p-14 rounded-3xl shadow-xl mb-6 sm:mb-12 transition-all duration-500 hover:bg-blue-700 transform hover:-translate-y-2 border-4 border-blue-500">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 sm:mb-6">Selamat Datang di Peminjaman Barang</h1>
            <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8">Kelola peminjaman barang-barang sekolah dengan mudah dan cepat.</p>
            <button
              onClick={handleStartBorrowing}
              className="px-6 py-3 sm:px-10 sm:py-4 bg-white text-blue-800 font-bold rounded-2xl shadow-lg hover:bg-gray-300 transition-transform duration-300 transform"
            >
              Mulai Meminjam
            </button>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2  gap-6 sm:gap-12">
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

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBell, FaClipboardList, FaFileAlt, FaHistory, FaPlus, FaUndo } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
    }
  }, [navigate]);

  const handleStartBorrowing = () => {
    navigate('/peminjaman');
  };

  const dashboardCards = [
    {
      title: 'Barang yang Tersedia',
      description: 'Lihat ada barang dan kelas apa saja yang tersedia.',
      bgClass: 'bg-gradient-to-r from-blue-800 to-blue-600',
      icon: <FaClipboardList />,
      path: '/tersedia',
      roles: ['USER', 'ADMIN', 'SUPER ADMIN'], 
    },
    {
      title: 'Notifikasi',
      description: 'Lihat notifikasi penerimaan barang dari Admin disini.',
      bgClass: 'bg-gradient-to-r from-blue-800 to-blue-600',
      icon: <FaBell />,
      path: '/listnotifikasi',
      roles: ['USER'], 
    },
    {
      title: 'Riwayat Peminjaman',
      description: 'Lihat riwayat peminjaman barang dan kelas sekolah.',
      bgClass: 'bg-gradient-to-r from-blue-800 to-blue-600',
      icon: <FaHistory />,
      path: '/riwayat',
      roles: ['ADMIN', 'SUPER ADMIN'], 
    },
    {
      title: 'Permintaan Barang dan Kelas',
      description: 'Lihat permintaan barang dan kelas',
      bgClass: 'bg-gradient-to-r from-blue-800 to-blue-600',
      icon: <FaFileAlt />,
      path: '/request',
      roles: ['ADMIN', 'SUPER ADMIN'], 
    },
    {
      title: 'Pengembalian',
      description: 'Kembalikan barang dan kelas disini',
      bgClass: 'bg-gradient-to-r from-blue-800 to-blue-600',
      icon: <FaUndo />,
      path: '/kembali',
      roles: ['USER'], 
    },
    {
      title: 'Tambah Barang/Kelas',
      description: 'Tambahkan barang dan kelas disini',
      bgClass: 'bg-gradient-to-r from-blue-800 to-blue-600',
      icon: <FaPlus />,
      path: '/kembali',
      roles: ['ADMIN', 'SUPER ADMIN'], 
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <main className="flex-1 p-6 sm:p-12 bg-opacity-80 rounded-lg shadow-lg">
        <div className="max-w-7xl mx-auto">
          {user ? (
            <>
              <section className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 sm:p-14 rounded-3xl shadow-xl mb-6 sm:mb-12 duration-500 hover:bg-blue-700 transform hover:-translate-y-2 border-4 border-blue-500">
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 sm:mb-6">Peminjaman Sekolah</h1>
                <p className="text-base font-medium sm:text-lg text-gray-300 mb-6 sm:mb-8">Kelola peminjaman barang dan kelas sekolah dengan mudah dan cepat.</p>
                
                {user.role === 'USER' && (
                  <button
                    onClick={handleStartBorrowing}
                    className="px-6 py-3 sm:px-10 sm:py-4 bg-white text-blue-800 font-bold rounded-2xl shadow-lg hover:bg-gray-300 transition-transform duration-300 transform"
                  >
                    Mulai Meminjam
                  </button>
                )}
              </section>

              <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12">
                {dashboardCards.map((card, index) => (
                  (!card.roles || (user && card.roles.some(role => role === user.role))) && (
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
                  )
                ))} 
              </section>
            </>
          ) : (
            <p className="text-white">Loading...</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

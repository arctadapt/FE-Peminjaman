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
    }
  }, [navigate]);

  const dashboardCards = [
    {
      title: 'Barang yang tersedia',
      description: 'Lihat barang dan ruangan yang tersedia.',
      icon: <FaClipboardList className="text-red-600 text-3xl" />,
      path: '/tersedia',
      roles: ['USER', 'ADMIN', 'SUPER ADMIN'],
    },
    {
      title: 'Notifikasi',
      description: 'Lihat notifikasi penerimaan barang dari Admin.',
      icon: <FaBell className="text-red-600 text-3xl" />,
      path: '/listnotifikasi',
      roles: ['USER'],
    },
    {
      title: 'Riwayat peminjaman',
      description: 'Lihat riwayat peminjaman barang dan ruangan sekolah.',
      icon: <FaHistory className="text-red-600 text-3xl" />,
      path: '/riwayat',
      roles: ['ADMIN', 'SUPER ADMIN'],
    },
    {
      title: 'Permintaan barang dan ruangan',
      description: 'Lihat permintaan barang dan ruangan.',
      icon: <FaFileAlt className="text-red-600 text-3xl" />,
      path: '/request',
      roles: ['ADMIN', 'SUPER ADMIN'],
    },
    {
      title: 'Pengembalian',
      description: 'Kembalikan barang dan ruangan di sini.',
      icon: <FaUndo className="text-red-600 text-3xl" />,
      path: '/kembali',
      roles: ['USER'],
    },
    {
      title: 'Tambah barang atau ruangan',
      description: 'Tambahkan barang dan ruangan di sini.',
      icon: <FaPlus className="text-red-600 text-3xl" />,
      path: '/tambah',
      roles: ['ADMIN', 'SUPER ADMIN'],
    },
    {
      title: 'Peminjaman Sekolah',
      description: 'Kelola peminjaman barang dan ruangan sekolah dengan mudah dan cepat.',
      icon: <FaClipboardList className="text-red-600 text-3xl" />,
      path: '/peminjaman',
      roles: ['USER'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#d9d9d9] flex flex-col">
      <main className="flex-1 py-4 sm:py-8 relative">
        <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200 mb-6 w-[90%] sm:w-[76rem] mx-auto">
          <div className="flex items-center space-x-4">
            <FaClipboardList className="text-red-600 text-3xl" />
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-black">List request</h3>
              <p className="text-sm text-gray-600 mt-1">Lihat dan kelola permintaan barang dan ruangan di sini.</p>
            </div>
          </div>
        </section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {user && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {dashboardCards.map((card, index) => (
                (!card.roles || card.roles.includes(user.role)) && (
                  <div
                    key={index}
                    className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200"
                    onClick={() => navigate(card.path)}
                  >
                    <div className="flex items-center space-x-4">
                      {card.icon}
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-black">{card.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{card.description}</p>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          )}

          {!user && <p className="text-black text-center">Loading...</p>}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

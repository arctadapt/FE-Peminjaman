import React from 'react';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-gray-200 flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          <nav>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700 transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/peminjaman')}
                  className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700 transition"
                >
                  Peminjaman
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/riwayat')}
                  className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700 transition"
                >
                  Riwayat Peminjaman
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/barang')}
                  className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700 transition"
                >
                  Barang Tersedia
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-10">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default Layout;

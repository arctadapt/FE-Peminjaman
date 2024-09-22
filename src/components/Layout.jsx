import React from 'react';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-gray-200">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-gray-200 shadow-lg flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8 text-gray-100">Dashboard</h2>
          <nav>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="block w-full text-left py-2 px-4 rounded-md hover:bg-gray-700 hover:scale-105 transform transition duration-300 ease-in-out shadow"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/peminjaman')}
                  className="block w-full text-left py-2 px-4 rounded-md hover:bg-gray-700 hover:scale-105 transform transition duration-300 ease-in-out shadow"
                >
                  Peminjaman
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/riwayat')}
                  className="block w-full text-left py-2 px-4 rounded-md hover:bg-gray-700 hover:scale-105 transform transition duration-300 ease-in-out shadow"
                >
                  Riwayat Peminjaman
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/barang')}
                  className="block w-full text-left py-2 px-4 rounded-md hover:bg-gray-700 hover:scale-105 transform transition duration-300 ease-in-out shadow"
                >
                  Barang Tersedia
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-10 shadow-inner">
        <div className="max-w-7xl mx-auto bg-white rounded-lg p-8 shadow-lg">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaClipboardList, FaBoxOpen, FaHistory, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Layout = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      <aside className="w-64 bg-blue-800 text-white p-6 flex flex-col shadow-lg border-r-4 border-blue-500 rounded-r-lg">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-blue-300">
            Dashboard
          </h2>
          <div className="h-1 bg-blue-500 rounded-full opacity-75 mt-6 mx-auto"></div>
        </div>

        <nav className="flex-grow">
          <ul className="space-y-6">
            {[ 
              { name: 'Home', icon: <FaHome />, path: '/dashboard' },
              { name: 'Peminjaman', icon: <FaBoxOpen />, path: '/peminjaman' },
              { name: 'Riwayat', icon: <FaHistory />, path: '/riwayat' },
              { name: 'Tersedia', icon: <FaClipboardList />, path: '/tersedia' },
            ].map((item, index) => (
              <li key={index}>
                <button
                  className="w-full py-4 flex items-center gap-4 text-lg font-medium bg-transparent hover:bg-blue-600 rounded-lg transition-all duration-300 transform hover:scale-105"
                  onClick={() => navigate(item.path)}
                >
                  <div className="text-2xl ml-4">{item.icon}</div>
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8">
          <div
            className="flex items-center gap-4 p-4 bg-blue-900 rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-600"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <FaUser className="text-2xl" />
            <div>
              <h3 className="text-lg font-semibold">Zeta Lawrance</h3>
              <p className="text-sm text-gray-400">Administrator</p>
            </div>
          </div>
          {showProfileMenu && (
            <div className="bg-blue-900 mt-2 rounded-lg p-2 space-y-2">
              <button
                className="flex items-center gap-3 p-2 w-full hover:bg-blue-600 rounded-md transition"
                onClick={() => navigate('/profile')}
              >
                <FaUser className="text-xl" />
                <span>View Profile</span>
              </button>
              <button
                className="flex items-center gap-3 p-2 w-full hover:bg-blue-600 rounded-md transition"
                onClick={() => navigate('/settings')}
              >
                <FaCog className="text-xl" />
                <span>Settings</span>
              </button>
              <button
                className="flex items-center gap-3 p-2 w-full hover:bg-red-600 rounded-md transition"
                onClick={() => navigate('/')}
              >
                <FaSignOutAlt className="text-xl" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </aside>
      <div className="flex-1 bg-gray-900">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

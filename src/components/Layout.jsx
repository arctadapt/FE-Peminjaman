import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHome, FaClipboardList, FaBoxOpen, FaHistory, FaUser, FaSignOutAlt, FaFileAlt, FaBell, FaUndo, FaUserPlus } from 'react-icons/fa';
import { FaFileCirclePlus } from "react-icons/fa6";
import { checkLogin, logOut } from '../features/AuthSlice';
import { useSnackbar } from '../components/SnackbarProvider';
import api from "../features/axios";
import API_URL from "../config/config";

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const showSnackbar = useSnackbar();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await dispatch(checkLogin()).unwrap();
      } catch (error) {
        console.error('Failed to verify authentication:', error);
        navigate('/');
      }
    };

    verifyAuth();
  }, [dispatch, navigate]);

  const handleLogout = async () => {
    try {
      await dispatch(logOut()).unwrap();
      showSnackbar('Logout successful', 'success');
      navigate('/');
    } catch (error) {
      showSnackbar('An error occurred during logout. Please try again.', 'error');
    }
  };

  const handleViewProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.status === 'success') {
        navigate('/profile', { state: { userData: response.data.data } });
      } else {
        throw new Error(response.data.message || 'Failed to fetch profile data');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      showSnackbar('Unable to view profile. Please try again later.', 'error');
    }
  };

  const navItems = [
    { name: 'Home', icon: <FaHome />, path: '/dashboard', roles: ['USER', 'ADMIN', 'SUPER ADMIN'] },
    { name: 'Add Admin', icon: <FaUserPlus />, path: '/admin', roles: ['ADMIN', 'SUPER ADMIN'] },
    { name: 'Peminjaman', icon: <FaBoxOpen />, path: '/peminjaman', roles: ['USER'] },
    { name: 'List History', icon: <FaHistory />, path: '/riwayat', roles: ['ADMIN', 'SUPER ADMIN'] },
    { name: 'List Request', icon: <FaFileAlt />, path: '/request', roles: ['ADMIN', 'SUPER ADMIN'] },
    { name: 'Tersedia', icon: <FaClipboardList />, path: '/tersedia', roles: ['USER', 'ADMIN', 'SUPER ADMIN'] },
    { name: 'List Notifications', icon: <FaBell />, path: '/listnotifikasi', roles: ['USER'] },
    { name: 'Pengembalian', icon: <FaUndo />, path: '/kembali', roles: ['USER'] },
    { name: 'Form Tambah', icon: <FaFileCirclePlus />, path: '/tambah', roles: ['ADMIN', 'SUPER ADMIN'] },
  ];

  return (
    <div className="flex h-screen bg-white-900 text-white-200">
      <aside className="w-64 bg-white-800 text-white p-6 flex flex-col shadow-lg border-r-4 border-red-700">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gray-800">
            Dashboard
          </h2>
          <div className="h-1 bg-red-700 rounded-full mt-6 mx-auto"></div>
        </div>

        <nav className="flex-grow">
          <ul className="space-y-6">
            {navItems
              .filter(item => item.roles.includes(user?.role))
              .map((item, index) => (
                <li key={index}>
                  <button
                    className="w-full py-4 flex items-center gap-4 text-lg font-medium bg-transparent hover:bg-red-800 rounded-lg text-black hover:text-white transition-all duration-300 transform hover:scale-105"
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
            className="flex items-center gap-4 p-4 bg-red-700 rounded-lg cursor-pointer transition-all duration-300 hover:bg-red-800"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <FaUser className="text-2xl" />
            <div>
              <h3 className="text-lg font-semibold">{"Profile"}</h3>
            </div>
          </div>
          {showProfileMenu && (
            <div className="bg-red-700 mt-2 rounded-lg p-2 space-y-2">
              <button
                className="flex items-center gap-3 p-2 w-full hover:bg-red-800 rounded-md transition"
                onClick={handleViewProfile}
              >
                <FaUser className="text-xl" />
                <span>View Profile</span>
              </button>
              <button
                className="flex items-center gap-3 p-2 w-full hover:bg-red-800 rounded-md transition"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="text-xl" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </aside>
      <div className="flex-1 bg-white-900">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkLogin } from '../features/AuthSlice';
import Pagination from '../components/Pagination';
import { useSnackbar } from "../components/SnackbarProvider";
import { FaBell, FaCheckCircle, FaEye, FaCheck } from 'react-icons/fa';

const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Tanggal Tidak Valid';
  }
};

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}... Lihat selengkapnya`;
  }
  return text;
};

// Data dummy untuk notifikasi
const dummyNotifications = [
  {
    id: 1,
    message: "Peminjaman buku 'React for Beginners' telah disetujui.",
    created_at: "2023-06-15T09:30:00Z",
    is_read: false
  },
  {
    id: 2,
    message: "Buku 'JavaScript: The Good Parts' yang Anda pinjam jatuh tempo dalam 2 hari.",
    created_at: "2023-06-14T14:45:00Z",
    is_read: true
  },
  {
    id: 3,
    message: "Permintaan peminjaman buku 'Design Patterns' sedang diproses.",
    created_at: "2023-06-13T11:20:00Z",
    is_read: false
  },
  {
    id: 4,
    message: "Buku 'Clean Code' yang Anda pesan sudah tersedia di perpustakaan.",
    created_at: "2023-06-12T16:00:00Z",
    is_read: false
  },
  {
    id: 5,
    message: "Pengingat: Jatuh tempo pengembalian buku 'Algorithms' adalah besok.",
    created_at: "2023-06-11T10:15:00Z",
    is_read: true
  }
];

export default function ListNotifikasi() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isError, user } = useSelector((state) => state.auth);
  const showSnackbar = useSnackbar();

  const [notifications, setNotifications] = useState(dummyNotifications);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(location.state?.page || 0);
  const [rowsPerPage, setRowsPerPage] = useState(location.state?.rowsPerPage || 5);

  const headLabel = useMemo(() => [
    { id: 'no', label: 'No', align: 'center', width: '50px' },
    { id: 'message', label: 'Pesan', align: 'center', width: '250px' },
    { id: 'created_at', label: 'Tanggal', width: '200px' },
    { id: 'action', label: 'Aksi', width: '200px' },
  ], []);

  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError, navigate]);

  const handleDetailClick = useCallback((notificationId) => {
    navigate(`/notifications`, {
      state: {
        returnTo: "/listnotifikasi",
        page,
        rowsPerPage,
      },
    });
  }, [navigate, page, rowsPerPage]);

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === notificationId ? { ...notification, is_read: true } : notification
      )
    );
    showSnackbar("Notifikasi ditandai sebagai sudah dibaca", "success");
  };

  const handleReadAllNotifications = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, is_read: true }))
    );
    showSnackbar("Semua notifikasi ditandai sebagai sudah dibaca", "success");
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <main className="flex-1 p-6 sm:p-12 bg-opacity-80 rounded-lg shadow-lg">
        <div className="max-w-7xl mx-auto">
          <section className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 sm:p-14 rounded-3xl shadow-xl mb-6 sm:mb-12 duration-500 hover:bg-blue-700 transform hover:-translate-y-2 border-4 border-blue-500">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 sm:mb-6">List Notifications</h1>
            <p className="text-base font-medium sm:text-lg text-gray-300 mb-6 sm:mb-8">Lihat notifikasi dari admin disini.</p>
            <button
              onClick={handleReadAllNotifications}
              className="px-6 py-3 sm:px-10 sm:py-4 bg-white text-blue-800 font-bold rounded-2xl shadow-lg hover:bg-gray-300 transition-transform duration-300 transform flex items-center"
            >
              <FaCheckCircle className="mr-2" />
              Tandai Semua Sudah Dibaca
            </button>
          </section>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
              <p>{error}</p>
            </div>
          )}

          <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-500">
            <div className="w-full overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-500">
                <thead className="bg-gray-200">
                  <tr>
                    {headLabel.map((headCell) => (
                      <th
                        key={headCell.id}
                        scope="col"
                        className={`px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider ${
                          headCell.align === 'center' ? 'text-center' : ''
                        }`}
                        style={{ width: headCell.width }}
                      >
                        {headCell.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {notifications.length > 0 ? (
                    notifications
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((notification, index) => (
                        <tr 
                          key={notification.id} 
                          className={`${notification.is_read ? '' : 'bg-blue-50'} hover:bg-gray-50 transition-colors duration-200`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                            {page * rowsPerPage + index + 1}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                            {truncateText(notification.message, 70)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                            {formatDate(notification.created_at)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            <div className="flex space-x-2">
                              <button 
                                className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs font-semibold hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
                                onClick={() => handleDetailClick(notification.id)}
                              >
                                <FaEye className="mr-1" /> Detail
                              </button>
                              <button 
                                className={`${
                                  notification.is_read 
                                    ? 'bg-gray-300 cursor-not-allowed' 
                                    : 'bg-green-500 hover:bg-green-600'
                                } text-white px-4 py-2 rounded-md text-xs font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center`}
                                onClick={() => handleMarkAsRead(notification.id)}
                                disabled={notification.is_read}
                              >
                                {notification.is_read 
                                  ? <><FaCheckCircle className="mr-1" /> Sudah Dibaca</>
                                  : <><FaCheck className="mr-1" /> Tandai Dibaca</>
                                }
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500 font-medium">
                        Tidak ada notifikasi ditemukan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {notifications.length > 0 && (
              <Pagination
                count={notifications.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

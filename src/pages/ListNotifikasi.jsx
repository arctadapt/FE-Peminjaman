import React, { useState, useEffect, useMemo } from 'react';
import Pagination from '../components/Pagination';
import api from '../features/axios';
import API_URL from '../config/config';
import { useSnackbar } from "../components/SnackbarProvider";
import { FaBell } from 'react-icons/fa';

const ListNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const showSnackbar = useSnackbar();

  const headLabel = useMemo(() => [
    { id: 'no', label: 'No', align: 'center', width: '50px' },
    { id: 'nama_user', label: 'Nama User', align: 'left', width: '200px' },
    { id: 'kelas_user', label: 'Kelas User', align: 'left', width: '150px' },
    { id: 'message', label: 'Pesan', align: 'left', width: '500px' },
    { id: 'date', label: 'Tanggal', align: 'left', width: '200px' },
    { id: 'action', label: 'Action', align: 'left', width: '150px' },
  ], []);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await api.get(`${API_URL}/notifications/:id`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data && Array.isArray(response.data.all_notifications)) {
        setNotifications(response.data.all_notifications);
      } else {
        setNotifications([]);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Gagal mendapatkan notifikasi. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const endpoint = `${API_URL}/notifications/${notificationId}?userId=${userId}`;
      const response = await api.put(endpoint, null, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data && response.data.status === "success") {
        setNotifications(prevNotifications =>
          prevNotifications.map(notification =>
            notification.id_notif === notificationId ? { ...notification, is_read: true } : notification
          )
        );
        showSnackbar("Notifikasi telah ditandai sebagai dibaca", "success");
      } else {
        showSnackbar("Gagal menandai notifikasi sebagai dibaca", "error");
      }
    } catch (error) {
      showSnackbar(error.response?.data?.error || error.message || "Terjadi kesalahan saat menandai notifikasi", "error");
    }
};

  const paginatedNotifications = notifications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="min-h-screen flex flex-col bg-[#d9d9d9]">
      <main className="flex-1 p-6 sm:p-12 bg-opacity-80 rounded-lg shadow-lg">
        <div className="max-w-7xl mx-auto">
        <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200 mb-6 w-[90%] sm:w-[76rem] mx-auto">
          <div className="flex items-center space-x-4">
            <FaBell className="text-red-600 text-3xl" />
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-black">List Notifikasi</h3>
              <p className="text-sm text-gray-600 mt-1">Lihat dan kelola notifikasi yang ada di sini.</p>
            </div>
          </div>
        </section>
          <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-500">
            <div className="w-full overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-500">
                <thead className="bg-gray-200">
                  <tr>
                    {headLabel.map((headCell) => (
                      <th
                        key={headCell.id}
                        scope="col"
                        className={`px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider ${headCell.align === 'center' ? 'text-center' : ''}`}
                        style={{ width: headCell.width }}
                      >
                        {headCell.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {error ? (
                    <tr>
                      <td colSpan={headLabel.length} className="px-6 py-4 text-center text-red-600">
                        {error}
                      </td>
                    </tr>
                  ) : notifications.length === 0 ? (
                    <tr>
                      <td colSpan={headLabel.length} className="px-6 py-4 text-center text-gray-500">
                        Tidak ada notifikasi.
                      </td>
                    </tr>
                  ) : (
                    paginatedNotifications.map((notification, index) => (
                      <tr key={notification.id_notif} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                          {page * rowsPerPage + index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                          {notification.nama_user}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                          {notification.kelas_user}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                          {notification.message.length > 100
                            ? `${notification.message.substring(0, 100)}... lihat selengkapnya di detail`
                            : notification.message}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                          {new Date(notification.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                          <button
                            onClick={() => !notification.is_read && handleMarkAsRead(notification.id_notif)}
                            className={`${
                              notification.is_read ? 'text-gray-400 cursor-not-allowed' : 'text-red-500 hover:text-red-700'
                            }`}
                            disabled={notification.is_read}
                          >
                            {notification.is_read ? 'Sudah Dibaca' : 'Tandai Dibaca'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <Pagination
              count={notifications.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListNotifications;

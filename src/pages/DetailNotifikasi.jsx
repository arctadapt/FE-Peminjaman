import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSnackbar } from "../components/SnackbarProvider";

const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Tanggal Tidak Valid';
  }
};

// Data dummy untuk notifikasi (sama dengan yang ada di ListNotifikasi)
const dummyNotifications = [
  {
    message: "Peminjaman buku 'React for Beginners' telah disetujui.",
    created_at: "2023-06-15T09:30:00Z",
    is_read: false
  },
  {
    message: "Buku 'JavaScript: The Good Parts' yang Anda pinjam jatuh tempo dalam 2 hari.",
    created_at: "2023-06-14T14:45:00Z",
    is_read: true
  },
  {
    message: "Permintaan peminjaman buku 'Design Patterns' sedang diproses.",
    created_at: "2023-06-13T11:20:00Z",
    is_read: false
  },
  {
    message: "Buku 'Clean Code' yang Anda pesan sudah tersedia di perpustakaan.",
    created_at: "2023-06-12T16:00:00Z",
    is_read: false
  },
  {
    message: "Pengingat: Jatuh tempo pengembalian buku 'Algorithms' adalah besok.",
    created_at: "2023-06-11T10:15:00Z",
    is_read: true
  }
];

export default function DetailNotifikasi() {
  const { index } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const showSnackbar = useSnackbar();

  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotificationDetail = () => {
      if (!isAuthenticated) {
        navigate('/', { replace: true });
        return;
      }

      setIsLoading(true);
      try {
        const notificationIndex = parseInt(index, 10);
        if (notificationIndex >= 0 && notificationIndex < dummyNotifications.length) {
          setNotification(dummyNotifications[notificationIndex]);
        } else {
          throw new Error("Notifikasi tidak ditemukan");
        }
      } catch (error) {
        setError("Terjadi kesalahan saat mengambil detail notifikasi");
        showSnackbar("Terjadi kesalahan saat mengambil detail notifikasi", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotificationDetail();
  }, [user, index, navigate, showSnackbar]);

  const handleGoBack = () => {
    const returnTo = location.state?.returnTo || '/listnotifikasi';
    navigate(returnTo, { 
      state: { 
        page: location.state?.page, 
        rowsPerPage: location.state?.rowsPerPage 
      } 
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={handleGoBack}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Kembali ke Daftar Notifikasi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Detail Notifikasi</h2>
            {notification && (
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
                  <p className="text-sm font-medium text-blue-700 mb-2">
                    Diterima pada: {formatDate(notification.created_at)}
                  </p>
                  <p className="text-lg text-gray-800">{notification.message}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Status:</h3>
                  <p className={`text-sm font-medium ${notification.is_read ? 'text-green-600' : 'text-yellow-600'}`}>
                    {notification.is_read ? 'Sudah Dibaca' : 'Belum Dibaca'}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <button
              onClick={handleGoBack}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-300"
            >
              Kembali ke Daftar Notifikasi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
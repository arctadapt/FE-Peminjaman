import React, { useState } from 'react';
import api from '../features/axios';
import API_URL from '../config/config';
import { useSnackbar } from '../components/SnackbarProvider';

const Admin = () => {
  const [namaLengkap, setNamaLengkap] = useState('');
  const [kelas, setKelas] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const showSnackbar = useSnackbar();

  const handleAdmin = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!namaLengkap.trim() || !kelas.trim() || !password.trim()) {
      showSnackbar('Semua field harus diisi', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post(`${API_URL}/users/admin`, {
        nama_lengkap: namaLengkap,
        kelas,
        password,
      });

      showSnackbar(response.data.message, 'success');
      
      // Reset form setelah berhasil
      setNamaLengkap('');
      setKelas('');
      setPassword('');
    } catch (error) {
      showSnackbar(error.response?.data?.message || 'Terjadi kesalahan saat menambah akun ADMIN', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-10 min-h-screen flex-col bg-gray-900">
      <div className="bg-white shadow-lg rounded-3xl p-8 max-w-lg w-full text-center transition-transform duration-300 transform hover:scale-102 border border-gray-300">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Tambah Admin</h1>

        <form onSubmit={handleAdmin}>
          <input
            type="text"
            value={namaLengkap}
            onChange={(e) => setNamaLengkap(e.target.value)}
            placeholder="Nama Lengkap"
            className="w-full h-12 mb-4 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 text-gray-700"
          />

          <input
            type="text"
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            placeholder="Kelas atau Jabatan"
            className="w-full h-12 mb-4 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 text-gray-700"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full h-12 mb-4 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 text-gray-700"
          />

          <button
            type="submit"
            className={`w-full py-2 rounded-xl text-white font-semibold ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} transition duration-200`}
            disabled={isLoading}
          >
            {isLoading ? 'Sedang Menambah...' : 'Tambah Admin'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;

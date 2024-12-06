import React, { useState } from 'react';
import api from '../features/axios';
import API_URL from '../config/config';
import { useSnackbar } from '../components/SnackbarProvider';

const AddForm = () => {
  const [type, setType] = useState('barang');
  const [nama_barang, setNama] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [tipe, setTipe] = useState('');
  const [nama_ruangan, setNamaRuangan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const showSnackbar = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const payload = type === 'barang'
        ? { nama_barang, jumlah_barang: parseInt(jumlah), tipe }
        : { nama_ruangan: nama_ruangan, status_ruangan: 'Tersedia' };

      const response = await api.post(`${API_URL}/peminjaman/${type}`, payload, { headers });

      if (response.data.status === 'success') {
        showSnackbar('Item berhasil ditambahkan!', 'success');
        resetForm();
      } else {
        throw new Error(response.data.message || 'Gagal menambahkan item');
      }
    } catch (error) {
      if (error.response && error.response.data.status === 'failed') {
        const message = error.response.data.message;
        if (message.includes('Barang dengan nama tersebut sudah ada')) {
          showSnackbar('Barang dengan nama tersebut sudah ada.', 'error');
        } else if (message.includes('Ruangan sudah ada')) {
          showSnackbar('Ruangan sudah ada.', 'error');
        } else {
          showSnackbar(error.message || 'Terjadi kesalahan', 'error');
        }
      } else {
        showSnackbar(error.message || 'Terjadi kesalahan', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setNama('');
    setJumlah('');
    setTipe('');
    setNamaRuangan('');
  };

  return (
    <div className="flex items-center justify-center py-10 min-h-screen flex-col bg-gray-900">
      <div className="bg-white shadow-lg rounded-3xl p-8 max-w-lg w-full text-center transition-transform duration-300 transform hover:scale-105 border border-gray-300 -mt-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Tambah {type === 'barang' ? 'Barang' : 'Ruangan'}</h1>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setType('barang')}
            className={`px-6 py-2 rounded-xl text-gray-700 font-semibold ${
              type === 'barang' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 hover:bg-gray-300'
            } transition duration-200`}
          >
            Barang
          </button>
          <button
            onClick={() => setType('ruangan')}
            className={`px-6 py-2 rounded-xl text-gray-700 font-semibold ${
              type === 'ruangan' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 hover:bg-gray-300'
            } transition duration-200`}
          >
            Ruangan
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'barang' ? (
            <>
              <input
                type="text"
                value={nama_barang}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama Barang"
                className="w-full px-4 py-2 border rounded-xl shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={jumlah}
                onChange={(e) => setJumlah(e.target.value)}
                placeholder="Jumlah Barang"
                className="w-full px-4 py-2 border rounded-xl shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="1"
              />
              <input
                type="text"
                value={tipe}
                onChange={(e) => setTipe(e.target.value)}
                placeholder="Tipe Barang"
                className="w-full px-4 py-2 border rounded-xl shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="1"
              />
            </>
          ) : (
            <>
              <input
                type="text"
                value={nama_ruangan}
                onChange={(e) => setNamaRuangan(e.target.value)}
                placeholder="Ruangan"
                className="w-full px-4 py-2 border rounded-xl shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {/* Status Ruangan */}
              <div className="mb-4">
                <select
                  value="Tersedia"
                  className="w-full px-4 py-2 border rounded-xl shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  disabled
                >
                  <option value="Tersedia">Status Ruangan: Tersedia</option>
                </select>
              </div>
            </>
          )}
          <button
            type="submit"
            className={`w-full py-3 text-white rounded-xl ${
              isLoading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
            } transition duration-200`}
            disabled={isLoading}
          >
            {isLoading ? 'Menambahkan...' : `Tambah ${type === 'barang' ? 'Barang' : 'Ruangan'}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddForm;

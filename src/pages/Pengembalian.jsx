import React, { useState, useEffect, useMemo } from 'react';
import Pagination from '../components/Pagination';
import api from '../features/axios';
import API_URL from '../config/config';
import { useSnackbar } from "../components/SnackbarProvider";

const Pengembalian = () => {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const showSnackbar = useSnackbar();

  const headLabel = useMemo(() => [
    { id: 'no', label: 'No', align: 'center', width: '50px' },
    { id: 'nama_user', label: 'Nama Peminjam  ', align: 'left', width: '150px' },
    { id: 'kelas_user', label: 'Kelas Peminjam', align: 'left', width: '150px' },
    { id: 'nama_barang', label: 'Barang dipinjam', align: 'left', width: '150px' },
    { id: 'kelas_jurusan', label: 'Kelas dipinjam', align: 'left', width: '200px' },
    { id: 'status_kembali', label: 'Status Kembali', align: 'left', width: '150px' },
    { id: 'action', label: 'Action', align: 'center', width: '200px' },
  ], []);

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await api.get(`${API_URL}/admin/kembali`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (Array.isArray(response.data)) {
        setReturns(response.data);
      } else {
        setReturns([]);
      }
    } catch (err) {
      console.error('Error fetching returns:', err);
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

  const handleReturn = async (idKembali) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.put(`${API_URL}/admin/kembali/${idKembali}`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      showSnackbar('Pengembalian berhasil!', 'success');
      fetchReturns();
    } catch (error) {
      console.error('Error returning item:', error);
      showSnackbar('Gagal mengembalikan barang. Silakan coba lagi.', 'error');
    }
  };

  const paginatedReturns = returns.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <main className="flex-1 p-6 sm:p-12 bg-opacity-80 rounded-lg shadow-lg">
        <div className="max-w-7xl mx-auto">
          <section className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 sm:p-14 rounded-3xl shadow-xl mb-6 sm:mb-12">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 sm:mb-6">List Pengembalian</h1>
            <p className="text-base font-medium sm:text-lg text-gray-300">Lihat dan kelola pengembalian barang di sini.</p>
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
                        Gagal mendapatkan data pengembalian. Silakan coba lagi.
                      </td>
                    </tr>
                  ) : returns.length === 0 ? (
                    <tr>
                      <td colSpan={headLabel.length} className="px-6 py-4 text-center text-gray-500">
                        Tidak ada data.
                      </td>
                    </tr>
                  ) : (
                    paginatedReturns.map((returnItem, index) => (
                      <tr key={returnItem.id_kembali} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                          {page * rowsPerPage + index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                          {returnItem.nama_user || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                          {returnItem.kelas_user || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                          {returnItem.nama_barang || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                          {returnItem.kelas_jurusan || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                          {returnItem.status_kembali}
                        </td>
                        <td className="px-6 py-4 text-sm text-center">
                          <button
                            onClick={() => handleReturn(returnItem.id_kembali)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                            disabled={returnItem.status_kembali === 'Sudah Dikembalikan'}
                          >
                            Kembalikan
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <Pagination
              rowsPerPage={rowsPerPage}
              count={returns.length}
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

export default Pengembalian;

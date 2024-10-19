import React, { useState, useEffect, useMemo } from 'react';
import Pagination from '../components/Pagination';
import api from '../features/axios';
import API_URL from '../config/config';

const Riwayat = ({ onReturn }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const headLabel = useMemo(() => [
    { id: 'no', label: 'No', align: 'center', width: '50px' },
    { id: 'nama_lengkap', label: 'Nama Lengkap', align: 'left', width: '200px' },
    { id: 'kelas_jurusan', label: 'Kelas & Jurusan', align: 'left', width: '150px' },
    { id: 'barangDipinjam', label: 'Barang Dipinjam', align: 'left', width: '200px' },
    { id: 'kelasDipinjam', label: 'Kelas Dipinjam', align: 'left', width: '200px' },
    { id: 'tanggal_pinjam', label: 'Tanggal Pinjam', align: 'center', width: '150px' },
    { id: 'tanggal_kembali', label: 'Tanggal Kembali', align: 'center', width: '150px' },
    { id: 'status_barang', label: 'Status Barang', align: 'center', width: '100px' },
    { id: 'status_kelas', label: 'Status Kelas', align: 'center', width: '100px' },
    { id: 'action', label: 'Aksi', align: 'center', width: '150px' },
  ], []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await api.get(`${API_URL}/history`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('API Response:', response.data);
        if (response.data.status === 'success') {
          setHistory(response.data.data);
        } else {
          throw new Error('Failed to fetch history');
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedHistory = history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <p className="text-white text-xl">Loading...</p>
    </div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <p className="text-red-500 text-xl">Error: {error}</p>
    </div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <main className="flex-1 p-6 sm:p-12 bg-opacity-80 rounded-lg shadow-lg">
        <div className="max-w-7xl mx-auto">
          <section className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 sm:p-14 rounded-3xl shadow-xl mb-6 sm:mb-12 duration-500 hover:bg-blue-700 transform hover:-translate-y-2 border-4 border-blue-500">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 sm:mb-6">Riwayat Peminjaman</h1>
            <p className="text-base font-medium sm:text-lg text-gray-300">Lihat riwayat peminjaman barang dan kelas di sini.</p>
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
                  {paginatedHistory.map((entry, index) => (
                    <tr 
                      key={index}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black text-center">
                        {page * rowsPerPage + index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-black font-medium">
                        {entry.nama_user}
                      </td>
                      <td className="px-6 py-4 text-sm text-black font-medium">
                        {entry.kelas_user}
                      </td>
                      <td className="px-6 py-4 text-sm text-black font-medium">
                        {entry.nama_barang || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-black font-medium">
                        {entry.kelas_pinjaman ? entry.kelas_pinjaman : (entry.status_kelas = '-')}
                      </td>
                      <td className="px-6 py-4 text-sm text-black font-medium text-center">
                        {new Date(entry.tanggal_pinjam).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-black font-medium text-center">
                        {entry.tanggal_kembali ? new Date(entry.tanggal_kembali).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-black font-medium text-center">
                        {entry.nama_barang ? entry.status_barang : '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-black font-medium text-center">
                        {entry.kelas_pinjaman ? entry.status_kelas : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              count={history.length}
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

export default Riwayat;
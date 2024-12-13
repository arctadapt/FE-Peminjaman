import React, { useState, useEffect, useMemo } from 'react';
import Pagination from '../components/Pagination';
import api from '../features/axios';
import API_URL from '../config/config';
import { FaHistory } from 'react-icons/fa';

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
    { id: 'message', label: 'Alasan', align: 'center', width: '300px' },
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
    <div className="min-h-screen flex flex-col bg-[#d9d9d9]">
      <main className="flex-1 p-6 sm:p-12 bg-opacity-80 rounded-lg shadow-lg">
        <div className="max-w-7xl mx-auto">
        <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200 mb-6 w-[90%] sm:w-[76rem] mx-auto">
        <div className="flex items-center space-x-4">
          <FaHistory className="text-red-600 text-3xl" />
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-black">Riwayat Peminjaman</h3>
            <p className="text-sm text-gray-600 mt-1">Lihat riwayat peminjaman barang dan ruangan di sini.</p>
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
                  ) : history.length === 0 ? (
                    <tr>
                      <td colSpan={headLabel.length} className="px-6 py-4 text-center text-gray-500">
                        Tidak ada riwayat peminjaman.
                      </td>
                    </tr>
                  ) : (
                    paginatedHistory.map((entry, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black text-center">{page * rowsPerPage + index + 1}</td>
                        <td className="px-6 py-4 text-sm text-black font-medium">{entry.nama_user}</td>
                        <td className="px-6 py-4 text-sm text-black font-medium">{entry.kelas_user}</td>
                        <td className="px-6 py-4 text-sm text-black font-medium">{entry.nama_barang || '-'}</td>
                        <td className="px-6 py-4 text-sm text-black font-medium">{entry.ruangan_pinjaman ? entry.ruangan_pinjaman : (entry.status_ruangan = '-')}</td>
                        <td className="px-6 py-4 text-sm text-black font-medium text-center">{new Date(entry.tanggal_pinjam).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-sm text-black font-medium text-center">{entry.tanggal_kembali ? new Date(entry.tanggal_kembali).toLocaleDateString() : '-'}</td>
                        <td className="px-6 py-4 text-sm text-black font-medium">{entry.message || '-'}</td>
                      </tr>
                    ))
                  )}
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

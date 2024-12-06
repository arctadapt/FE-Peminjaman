import React, { useState, useEffect, useMemo } from 'react';
import Pagination from '../components/Pagination';
import api from '../features/axios';
import API_URL from '../config/config';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useSnackbar } from "../components/SnackbarProvider";

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const showSnackbar = useSnackbar();

  const headLabel = useMemo(() => [
    { id: 'no', label: 'No', align: 'center', width: '50px' },
    { id: 'nama_user', label: 'Nama Lengkap', align: 'left', width: '200px' },
    { id: 'kelas_user', label: 'Kelas & Jurusan', align: 'left', width: '200px' },
    { id: 'barang', label: 'Barang dipinjam', align: 'left', width: '200px' },
    { id: 'jumlah', label: 'Jumlah Barang', align: 'left', width: '200px' },
    { id: 'ruangan', label: 'Ruangan dipinjam', align: 'left', width: '200px' },
    { id: 'date', label: 'Tanggal', align: 'left', width: '150px' },
    { id: 'status', label: 'Status', align: 'left', width: '150px' },
    { id: 'action', label: 'Action', align: 'center', width: '200px' },
  ], []);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await api.get(`${API_URL}/admin/requests`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (Array.isArray(response.data)) {
        setRequests(response.data);
      } else if (response.data && Array.isArray(response.data.data)) {
        setRequests(response.data.data);
      } else {
        setRequests([]);
      }
    } catch (err) {
      console.error('Error fetching requests:', err);
      setError('Gagal mendapatkan permintaan. Silakan coba lagi.');
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

  const handleAccept = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      await api.post(`${API_URL}/admin/approve/${requestId}`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchRequests();
      showSnackbar('Permintaan berhasil disetujui!', 'success');
    } catch (error) {
      console.error('Error approving request:', error);
      setError('Gagal menyetujui permintaan. Silakan coba lagi.');
      showSnackbar('Gagal menyetujui permintaan. Silakan coba lagi.', 'error');
    }
  };

  const handleRejectClick = (requestId) => {
    setSelectedRequestId(requestId);
    setOpenRejectDialog(true);
  };

  const handleRejectConfirm = async () => {
    if (!rejectReason.trim()) {
      alert('Please provide a reason for rejection.');
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      await api.post(`${API_URL}/admin/reject/${selectedRequestId}`, { reason: rejectReason }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setOpenRejectDialog(false);
      setRejectReason('');
      fetchRequests();
      showSnackbar('Permintaan berhasil ditolak!', 'success');
    } catch (error) {
      console.error('Error rejecting request:', error);
      setError('Gagal menolak permintaan. Silakan coba lagi.');
      showSnackbar('Gagal menolak permintaan. Silakan coba lagi.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogClose = () => {
    setOpenRejectDialog(false);
    setRejectReason('');
    setSelectedRequestId(null);
  };

  const paginatedRequests = requests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <main className="flex-1 p-6 sm:p-12 bg-opacity-80 rounded-lg shadow-lg">
        <div className="max-w-7xl mx-auto">
          <section className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 sm:p-14 rounded-3xl shadow-xl mb-6 sm:mb-12 duration-500 hover:bg-blue-700 transform hover:-translate-y-2 border-4 border-blue-500">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 sm:mb-6">List Request</h1>
            <p className="text-base font-medium sm:text-lg text-gray-300">Lihat dan kelola permintaan barang dan ruangan di sini.</p>
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
                  {/* Display error if any */}
                  {error ? (
                    <tr>
                      <td colSpan={headLabel.length} className="px-6 py-4 text-center text-red-600">
                        Gagal mendapatkan permintaan. Silakan coba lagi.
                      </td>
                    </tr>
                  ) : requests.length === 0 ? (
                    <tr>
                      <td colSpan={headLabel.length} className="px-6 py-4 text-center text-gray-500">
                        Tidak ada data.
                      </td>
                    </tr>
                  ) : (
                    paginatedRequests.map((request, index) => (
                      <tr key={request.id_request} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                          {page * rowsPerPage + index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">{request.nama_user}</td>
                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">{request.kelas_user}</td>
                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">{request.nama_barang || '-'}</td>
                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">{request.jumlah_barang || '-'}</td>
                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">{request.nama_ruangan || '-'}</td>
                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">{new Date(request.tanggal_pinjam).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">{request.status}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <div className="flex space-x-2 justify-center">
                            {request.status === 'Menunggu' && (
                              <>
                                <button 
                                  onClick={() => handleAccept(request.id_request)}
                                  className="bg-green-500 text-white px-4 py-2 rounded-md text-xs font-semibold hover:bg-green-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center"
                                >
                                  <FaCheck className="mr-1" /> Setujui
                                </button>
                                <button 
                                  onClick={() => handleRejectClick(request.id_request)} 
                                  className="bg-red-500 text-white px-4 py-2 rounded-md text-xs font-semibold hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center"
                                >
                                  <FaTimes className="mr-1" /> Tolak
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <Pagination
              rowsPerPage={rowsPerPage}
              count={requests.length}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </div>
        </div>
      </main>

      {/* Reject dialog */}
      <Dialog open={openRejectDialog} onClose={handleDialogClose}>
        <DialogTitle>Reject Request</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Give a reason?"
            type="text"
            fullWidth
            variant="outlined"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </DialogContent>
            <DialogActions
            sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}
          >
            <Button
              onClick={handleDialogClose}
              variant="contained"
              color="error"
              sx={{ width: '220px' }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRejectConfirm}
              variant="contained"
              color="primary"
              sx={{ width: '220px' }}
              disabled={isLoading}
            >
              Confirm
            </Button>
          </DialogActions>
      </Dialog>
    </div>
  );
};

export default Request;

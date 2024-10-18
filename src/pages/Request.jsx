import React, { useState, useEffect, useMemo } from 'react';
import Pagination from '../components/Pagination';
import { FaEye } from 'react-icons/fa';

// Data palsu
const fakeRequests = [
  { id: 1, officeEmail: 'user1@wgs.com', fullName: 'User Satu', date: '2024-10-08', message: 'Pesan 1' },
  { id: 2, officeEmail: 'user2@wgs.com', fullName: 'User Dua', date: '2024-10-08', message: 'Pesan 2' },
  { id: 3, officeEmail: 'user3@wgs.com', fullName: 'User Tiga', date: '2024-10-08', message: 'Pesan 3' },
  { id: 4, officeEmail: 'user4@wgs.com', fullName: 'User Empat', date: '2024-10-08', message: 'Pesan 4' },
  { id: 5, officeEmail: 'user5@wgs.com', fullName: 'User Lima', date: '2024-10-08', message: 'Pesan 5' },
  { id: 6, officeEmail: 'user6@wgs.com', fullName: 'User Enam', date: '2024-10-08', message: 'Pesan 6' },
  { id: 7, officeEmail: 'user7@wgs.com', fullName: 'User Tujuh', date: '2024-10-08', message: 'Pesan 7' },
  { id: 8, officeEmail: 'user8@wgs.com', fullName: 'User Delapan', date: '2024-10-08', message: 'Pesan 8' },
];

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const headLabel = useMemo(() => [
    { id: 'no', label: 'No', align: 'center', width: '50px' },
    { id: 'officeEmail', label: 'Office Email', align: 'left', width: '200px' },
    { id: 'fullName', label: 'Full Name', align: 'left', width: '200px' },
    { id: 'date', label: 'Date', align: 'left', width: '150px' },
    { id: 'message', label: 'Message', align: 'left', width: '250px' },
    { id: 'action', label: 'Action', align: 'center', width: '100px' },
  ], []);

  useEffect(() => {
    // Simulasi pengambilan data
    const fetchRequests = () => {
      const startIndex = page * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      const paginatedRequests = fakeRequests.slice(startIndex, endIndex);
      setRequests(paginatedRequests);
    };

    fetchRequests();
  }, [page, rowsPerPage]);

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
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 sm:mb-6">List Request</h1>
            <p className="text-base font-medium sm:text-lg text-gray-300">Lihat dan kelola permintaan barang dan kelas di sini.</p>
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
                  {requests.map((request, index) => (
                    <tr 
                      key={request.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                        {page * rowsPerPage + index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                        {request.officeEmail}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                        {request.fullName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                        {request.date}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                        {request.message}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div className="flex space-x-2 justify-center">
                          <button 
                            className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs font-semibold hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
                          >
                            <FaEye className="mr-1" /> Detail
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              count={fakeRequests.length}
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

export default Request;

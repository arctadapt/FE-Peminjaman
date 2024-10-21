import React, { useState, useEffect } from 'react';
import api from '../features/axios';
import API_URL from '../config/config';

const Tersedia = () => {
  const [availableItems, setAvailableItems] = useState([]);
  const [unavailableItems, setUnavailableItems] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [kelasFilter, setKelasFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('available');
  const [sortOrder, setSortOrder] = useState('asc'); // New state for sorting order

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const [itemsResponse, classesResponse] = await Promise.all([
          api.get(`${API_URL}/items`, { headers }),
          api.get(`${API_URL}/class`, { headers }),
        ]);

        if (itemsResponse.data.status === 'success') {
          const items = itemsResponse.data.data_barang;
          setAvailableItems(sortItems(items.filter(item => item.jumlah_barang > 0)));
          setUnavailableItems(items.filter(item => item.jumlah_barang === 0));
        }

        if (classesResponse.data.status === 'success') {
          setClasses(classesResponse.data.data_class);
        }
      } catch (error) {
        console.error('Error:', error);
        setError(error.message || 'Terjadi kesalahan yang tidak terduga');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortItems = (items) => {
    return items.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.nama_barang.localeCompare(b.nama_barang);
      } else {
        return b.nama_barang.localeCompare(a.nama_barang);
      }
    });
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    setAvailableItems(prevItems => sortItems([...prevItems]));
  };

  const filteredClasses = classes.filter(kelas => {
    const matchesKelasFilter = kelasFilter === '' || kelas.kelas_jurusan.split(' ')[0] === kelasFilter;
    const matchesStatusFilter = 
      (statusFilter === 'available' && kelas.status_kelas === 'Tersedia') ||
      (statusFilter === 'unavailable' && kelas.status_kelas !== 'Tersedia') ||
      statusFilter === 'all';
    return matchesKelasFilter && matchesStatusFilter;
  });
  
  if (isLoading) {
    return <div className="text-white text-center">Memuat data...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-8">
      <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 w-full max-w-7xl">
        
        {/* Bagian Barang */}
        <div className="w-full lg:w-1/2 bg-white shadow-2xl rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:shadow-blue-500/20 hover:scale-[1.02] border-2">
          <div className="flex justify-between items-center mb-6 border-b-2 border-blue-500 pb-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Barang Tersedia</h2>
            <button 
              onClick={toggleSortOrder}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Urutkan {sortOrder === 'asc' ? '↓' : '↑'}
            </button>
          </div>
          {availableItems.length > 0 ? (
            <ul className="space-y-4 overflow-y-auto max-h-[60vh]">
              {availableItems.map((item) => (
                <li key={item.id_barang} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-blue-100 shadow-lg rounded-xl transition-all duration-300 hover:bg-blue-200 hover:shadow-blue-500/30 border border-blue-300">
                  <span className="text-blue-800 font-semibold mb-2 sm:mb-0">{item.nama_barang}</span>
                  <span className={`font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-600`}>
                    Stok: {item.jumlah_barang}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center italic border border-gray-300 rounded-lg p-4">Tidak ada barang tersedia saat ini.</p>
          )}
        </div>

        {/* Bagian Kelas */}
        <div className="w-full lg:w-1/2 bg-white shadow-2xl rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:shadow-blue-500/20 hover:scale-[1.02] border-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">Kelas</h2>

          {/* Filter Kelas */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={() => setKelasFilter('')}
              className={`px-4 py-2 rounded-lg ${kelasFilter === '' ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-800'} transition-all duration-300`}
            >
              Semua Kelas
            </button>
            <button
              onClick={() => setKelasFilter('X')}
              className={`px-4 py-2 rounded-lg ${kelasFilter === 'X' ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-800'} transition-all duration-300`}
            >
              Kelas X
            </button>
            <button
              onClick={() => setKelasFilter('XI')}
              className={`px-4 py-2 rounded-lg ${kelasFilter === 'XI' ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-800'} transition-all duration-300`}
            >
              Kelas XI
            </button>
            <button
              onClick={() => setKelasFilter('XII')}
              className={`px-4 py-2 rounded-lg ${kelasFilter === 'XII' ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-800'} transition-all duration-300`}
            >
              Kelas XII
            </button>
          </div>

          {/* Filter Status */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-lg ${statusFilter === 'all' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800'} transition-all duration-300`}
            >
              Semua Status
            </button>
            <button
              onClick={() => setStatusFilter('available')}
              className={`px-4 py-2 rounded-lg ${statusFilter === 'available' ? 'bg-green-600 text-white' : 'bg-green-200 text-green-800'} transition-all duration-300`}
            >
              Tersedia
            </button>
            <button
              onClick={() => setStatusFilter('unavailable')}
              className={`px-4 py-2 rounded-lg ${statusFilter === 'unavailable' ? 'bg-red-600 text-white' : 'bg-red-200 text-red-800'} transition-all duration-300`}
            >
              Tidak Tersedia
            </button>
          </div>

          {filteredClasses.length > 0 ? (
            <ul className="space-y-4 overflow-y-auto max-h-[60vh]">
              {filteredClasses.map((kelas) => (
                <li key={kelas.id_kelas} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-blue-100 shadow-lg rounded-xl transition-all duration-300 hover:bg-blue-200 hover:shadow-blue-500/30 border border-blue-300">
                  <span className="text-blue-800 font-semibold mb-2 sm:mb-0">{kelas.kelas_jurusan}</span>
                  <span className={`font-semibold px-3 py-1 rounded-full ${kelas.status_kelas === 'Tersedia' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    Status: {kelas.status_kelas}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center italic border border-gray-300 rounded-lg p-4">Tidak ada kelas yang sesuai dengan filter saat ini.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tersedia;
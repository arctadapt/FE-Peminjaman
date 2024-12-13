import React, { useState, useEffect } from 'react';
import api from '../features/axios';
import API_URL from '../config/config';

const Tersedia = () => {
  const [allItems, setAllItems] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ruanganFilter, setRuanganFilter] = useState('');
  const [ruanganStatusFilter, setRuanganStatusFilter] = useState('available');
  const [barangFilter, setBarangFilter] = useState('');
  const [barangStatusFilter, setBarangStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');

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
          setAllItems(sortItems(items));
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
      // First, sort by availability (available items first)
      if (a.jumlah_barang > 0 && b.jumlah_barang === 0) return -1;
      if (a.jumlah_barang === 0 && b.jumlah_barang > 0) return 1;
      
      // Then sort alphabetically within availability groups
      if (sortOrder === 'asc') {
        return a.nama_barang.localeCompare(b.nama_barang);
      } else {
        return b.nama_barang.localeCompare(a.nama_barang);
      }
    });
  };

  const filteredClasses = classes.filter(ruangan => {
    const matchesRuanganFilter = 
      ruanganFilter === '' || 
      ruangan.tipe_ruangan.toLowerCase().includes(ruanganFilter.toLowerCase());
    
    const matchesStatusFilter = 
      (ruanganStatusFilter === 'available' && ruangan.status_ruangan === 'Tersedia') ||
      (ruanganStatusFilter === 'unavailable' && ruangan.status_ruangan !== 'Tersedia') ||
      ruanganStatusFilter === 'all';
    
    return matchesRuanganFilter && matchesStatusFilter;
  });

  const filteredItems = allItems.filter(barang => {
    const matchesBarangFilter = 
      barangFilter === '' || 
      barang.tipe_barang.toLowerCase().includes(barangFilter.toLowerCase());
    
    const matchesBarangStatusFilter = 
      barangStatusFilter === 'all' ||
      (barangStatusFilter === 'available' && barang.jumlah_barang > 0) ||
      (barangStatusFilter === 'unavailable' && barang.jumlah_barang === 0);
    
    return matchesBarangFilter && matchesBarangStatusFilter;
  });

  if (isLoading) {
    return <div className="text-white text-center">Memuat data...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#d9d9d9] p-4 sm:p-8">
      <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 w-full max-w-7xl">
        
        {/* Bagian Barang */}
        <div className="w-full lg:w-1/2 bg-white shadow-2xl rounded-[0.5rem] p-6 sm:p-8 transition-all duration-300 hover:shadow-red-500/20 border-2">
          <div className="flex justify-between items-center mb-6 border-b-2 border-red-500 pb-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Barang</h2>
          </div>
          
          {/* Filter Tipe Barang */}
          <div className="mb-4">
            <select
              value={barangFilter}
              onChange={(e) => setBarangFilter(e.target.value)}
              className="w-full px-4 py-2 border rounded-[0.5rem] shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="">Semua Barang</option>
              <option value="alat">Alat</option>
              <option value="eskul">Eskul</option>
              {/* Tambahkan opsi filter tipe barang sesuai kebutuhan */}
            </select>
          </div>

          {/* Filter Status Barang */}
          <div className="mb-6">
            <select
              value={barangStatusFilter}
              onChange={(e) => setBarangStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border rounded-[0.5rem] shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="all">Semua Status</option>
              <option value="available">Tersedia</option>
              <option value="unavailable">Tidak Tersedia</option>
            </select>
          </div>

          {filteredItems.length > 0 ? (
            <ul className="space-y-4 overflow-y-auto max-h-[50vh]">
              {filteredItems.map((item) => (
                <li 
                  key={item.id_barang} 
                  className={`
                    flex flex-col sm:flex-row justify-between items-start sm:items-center 
                    p-4 border border-gray-200 rounded-[0.5rem]
                    shadow-sm hover:shadow-md transition-all duration-300 
                    hover:border-gray-300
                    ${item.jumlah_barang > 0 
                      ? 'bg-green-50 hover:bg-green-100' 
                      : 'bg-red-50 hover:bg-red-100'}
                  `}
                >
                  <div className="flex flex-col">
                    <span className="text-gray-900 font-bold text-base mb-1">
                      {item.nama_barang}
                    </span>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <span className="text-sm">
                        <strong>Tipe:</strong> {item.tipe_barang}
                      </span>
                    </div>
                  </div>
                  <span 
                    className={`
                      font-semibold px-3 py-1 rounded-[0.5rem] mt-2 sm:mt-0
                      ${item.jumlah_barang > 0 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'}
                    `}
                  >
                    Stok: {item.jumlah_barang}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center italic border border-gray-300 rounded-[0.5rem] p-4">Tidak ada barang tersedia saat ini.</p>
          )}
        </div>

        {/* Bagian Ruangan */}
        <div className="w-full lg:w-1/2 bg-white shadow-2xl rounded-[0.5rem] p-6 sm:p-8 transition-all duration-300 hover:shadow-gray-500/20 border-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b-2 border-red-500 pb-2">Ruangan</h2>
            
          {/* Filter Ruangan */}
          <div className="mb-4">
            <select
              value={ruanganFilter}
              onChange={(e) => setRuanganFilter(e.target.value)}
              className="w-full px-4 py-2 border rounded-[0.5rem] shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="">Semua Ruangan</option>
              <option value="Umum">Umum</option>
              <option value="kelas X">Kelas X</option>
              <option value="kelas XI">Kelas XI</option>
              <option value="kelas XII">Kelas XII</option>
            </select>
          </div>

          {/* Filter Status Ruangan */}
          <div className="mb-6">
            <select
              value={ruanganStatusFilter}
              onChange={(e) => setRuanganStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border rounded-[0.5rem] shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="all">Semua Status</option>
              <option value="available">Tersedia</option>
              <option value="unavailable">Tidak Tersedia</option>
            </select>
          </div>

          {filteredClasses.length > 0 ? (
            <ul className="space-y-4 overflow-y-auto max-h-[50vh]">
              {filteredClasses.map((ruangan) => (
                <li 
                  key={ruangan.id_ruangan} 
                  className={`
                    flex flex-col sm:flex-row justify-between items-start sm:items-center 
                    p-4 border border-gray-200 rounded-[0.5rem]
                    shadow-sm hover:shadow-md transition-all duration-300 
                    hover:border-gray-300
                    ${ruangan.status_ruangan === 'Tersedia' 
                      ? 'bg-green-50 hover:bg-green-100' 
                      : 'bg-red-50 hover:bg-red-100'}
                  `}
                >
                  <div className="flex flex-col space-y-1 w-full sm:w-auto">
                    <span className="text-gray-900 font-bold text-base">
                      {ruangan.nama_ruangan}
                    </span>
                    <span className="text-gray-700 text-sm">
                      Tipe: {ruangan.tipe_ruangan}
                    </span>
                  </div>
                  <span 
                    className={`
                      font-semibold px-3 py-1 rounded-[0.5rem] mt-2 sm:mt-0
                      ${ruangan.status_ruangan === 'Tersedia' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'}
                    `}
                  >
                    Status: {ruangan.status_ruangan}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center italic border border-gray-300 rounded-[0.5] p-4">Tidak ada Ruangan yang sesuai dengan filter saat ini.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tersedia;
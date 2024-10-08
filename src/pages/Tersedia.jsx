import React, { useState, useEffect } from 'react';
import api from '../features/axios';
import API_URL from '../config/config';

const Tersedia = () => {
  const [availableItems, setAvailableItems] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const [itemsResponse, classesResponse] = await Promise.all([
          api.get(`${API_URL}/items`, { headers }),
          api.get(`${API_URL}/class`, { headers })
        ]);

        if (itemsResponse.data.status === 'success') {
          setAvailableItems(itemsResponse.data.data_barang);
        }

        if (classesResponse.data.status === 'success') {
          setAvailableClasses(classesResponse.data.data_class);
        }

        // Log the received data for debugging
        console.log('Classes data:', classesResponse.data);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message || 'Terjadi kesalahan yang tidak terduga');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="text-white text-center">Memuat data...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-8">
      <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 w-full max-w-7xl">
        {/* Barang Section remains the same */}
        <div className="w-full lg:w-1/2 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-2xl rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:shadow-blue-500/20 hover:scale-[1.02]">
          <h2 className="text-3xl font-bold text-white mb-6 border-b border-blue-500 pb-2">Barang Tersedia</h2>
          {availableItems.length > 0 ? (
            <ul className="space-y-4">
              {availableItems.map((item) => (
                <li key={item.id_barang} className="flex justify-between items-center p-4 bg-white bg-opacity-20 shadow-lg rounded-xl transition-all duration-300 hover:bg-opacity-30 hover:shadow-blue-500/30">
                  <span className="text-white font-semibold">{item.nama_barang}</span>
                  <span className="text-blue-300 font-semibold px-3 py-1 bg-blue-500 bg-opacity-20 rounded-full">
                    Stok: {item.jumlah_barang}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-300 text-center italic">Tidak ada barang tersedia saat ini.</p>
          )}
        </div>
        
        {/* Kelas Section */}
        <div className="w-full lg:w-1/2 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-2xl rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:shadow-purple-500/20 hover:scale-[1.02]">
          <h2 className="text-3xl font-bold text-white mb-6 border-b border-purple-500 pb-2">Kelas Tersedia</h2>
          {availableClasses.length > 0 ? (
            <ul className="space-y-4">
              {availableClasses.map((kelas) => (
                <li key={kelas.id_kelas} className="flex justify-between items-center p-4 bg-white bg-opacity-20 shadow-lg rounded-xl transition-all duration-300 hover:bg-opacity-30 hover:shadow-purple-500/30">
                  <span className="text-white font-semibold">{kelas.kelas_jurusan}</span>
                  <span className={`font-semibold px-3 py-1 rounded-full ${
                    kelas.status_kelas
                      ? 'bg-green-500 bg-opacity-20 text-green-300'
                      : 'bg-red-500 bg-opacity-20 text-red-300'
                  }`}>
                    Status: {kelas.status_kelas}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-300 text-center italic">Tidak ada kelas tersedia saat ini.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tersedia;
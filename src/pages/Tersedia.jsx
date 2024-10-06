import React, { useState, useEffect } from 'react';
import api from '../features/axios';
import API_URL from '../config/config';

const Tersedia = () => {
  const [availableItems, setAvailableItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {

        const token = localStorage.getItem('token');

        const response = await api.get(`${API_URL}/items`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log('Response:', response);

        if (response.data.status === 'success') {
          setAvailableItems(response.data.data_barang);
        } else {
          throw new Error(response.data.message || 'Gagal mengambil data barang');
        }
      } catch (error) {
        console.error('Error details:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up request:', error.message);
        }
        setError(error.message || 'An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (isLoading) {
    return <div className="text-white text-center">Memuat data...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="flex items-center justify-center py-10 min-h-screen flex flex-col bg-gray-900">
      <div className="bg-white shadow-lg rounded-3xl p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Barang yang Tersedia</h1>
        {availableItems.length > 0 ? (
          <ul className="bg-gray-100 rounded-2xl shadow-md p-4 mb-4">
            {availableItems.map((item) => (
              <li key={item.id_barang} className="flex justify-between items-center mb-4 p-4 bg-white shadow rounded-xl">
                <span className="text-gray-700 font-semibold">{item.nama_barang}</span>
                <span className="text-teal-600 font-semibold text-base">Stok: {item.jumlah_barang}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Tidak ada barang tersedia saat ini.</p>
        )}
      </div>
    </div>
  );
};

export default Tersedia;
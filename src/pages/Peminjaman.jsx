import React from 'react';

const Peminjaman = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-10 max-w-lg w-full text-center transform transition-transform duration-300 hover:scale-105">
        <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white mb-6">Peminjaman Barang</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Di halaman ini, Anda bisa meminjam barang-barang yang tersedia dengan mudah dan cepat.
        </p>
        
        <button className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
          Lihat Barang Tersedia
        </button>
      </div>
    </div>
  );
};

export default Peminjaman;

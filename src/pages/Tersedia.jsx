import React from 'react';

const Tersedia = ({ availableItems }) => {
  return (
    <div className="flex items-center justify-center py-10 min-h-screen flex flex-col bg-gray-900">
      <div className="bg-white shadow-lg rounded-3xl p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Barang yang Tersedia</h1>
        <ul className="bg-gray-100 rounded-2xl shadow-md p-4 mb-4">
        {availableItems.map((item) => (
          <li key={item.id} className="flex justify-between items-center mb-4 p-4 bg-white shadow rounded-xl">
            <span className="text-gray-700 font-semibold">{item.name}</span>
            <span className="text-teal-600 font-semibold text-base">Stok: {item.stock}</span>
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
};

export default Tersedia;

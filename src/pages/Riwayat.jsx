import React from 'react';

const Riwayat = ({ history, activeLoans, onReturn }) => {
  return (
    <div className="flex items-center justify-center py-10 min-h-screen flex-col bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-3xl p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-gray-100 mb-6">Riwayat Peminjaman</h1>
        {history.length > 0 ? (
          <ul className="bg-gray-700 rounded-2xl shadow-md p-4 mb-4">
            {history.map((entry, index) => (
              <li key={index} className="text-gray-200 font-semibold mb-4 p-4 bg-gray-600 shadow rounded-xl">
                <p>Nama Lengkap: {entry.namaLengkap}</p>
                <p>Kelas: {entry.kelasPeminjam}</p>
                <p>Barang/Kelas yang Dipinjam: {entry.barangDipinjam}</p>
                <p>Status: {entry.isApproved}</p>
                {entry.isApproved === 'Disetujui' && !entry.returned && (
                  <button
                    onClick={() => onReturn(entry.barangDipinjam)}
                    className="mt-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-200"
                  >
                    Konfirmasi Pengembalian
                  </button>
                )}
                {entry.returned && (
                  <p className="text-green-400 font-semibold mt-2">Barang/Kelas telah dikembalikan</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-400">Tidak ada riwayat peminjaman.</p>
        )}

        {activeLoans.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-gray-100 mb-4">Peminjaman Aktif</h2>
            <ul className="bg-gray-700 rounded-2xl shadow-md p-4 mb-4">
              {activeLoans.map((loan, index) => (
                <li key={index} className="text-gray-200 font-semibold mb-4 p-4 bg-gray-600 shadow rounded-xl">
                  <p>Nama Lengkap: {loan.namaLengkap}</p>
                  <p>Barang/Kelas yang Dipinjam: {loan.barangDipinjam}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Riwayat;
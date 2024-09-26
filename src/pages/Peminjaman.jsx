import React, { useState } from 'react';

const Peminjaman = ({ availableItems, onBorrow }) => {
  const [namaLengkap, setNamaLengkap] = useState('');
  const [kelasPeminjam, setKelasPeminjam] = useState('');
  const [isBarang, setIsBarang] = useState(null);
  const [barangDipinjam, setBarangDipinjam] = useState([]);
  const [kelasDipinjam, setKelasDipinjam] = useState('');
  const [jurusan, setJurusan] = useState('');
  const [isApproved, setIsApproved] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    const approvalStatus = Math.random() > 0.5;
    setIsApproved(approvalStatus);
  
    const newHistoryEntry = {
      namaLengkap,
      kelasPeminjam,
      barangDipinjam: isBarang ? barangDipinjam.join(', ') : `Kelas ${kelasDipinjam} (${jurusan})`,
      isApproved: approvalStatus ? 'Disetujui' : 'Ditolak',
      returned: false, 
    };
  
    console.log('New history entry:', newHistoryEntry);
  
    if (isBarang && approvalStatus) {
      onBorrow(barangDipinjam, newHistoryEntry); 
    } else if (!isBarang && approvalStatus) {
      onBorrow([`Kelas ${kelasDipinjam} (${jurusan})`], newHistoryEntry);
    }
  };
  
  const handleSelectItem = (item) => {
    if (item.stock > 0) {
      setBarangDipinjam(prevItems => {
        if (!prevItems.includes(item.name)) {
          return [...prevItems, item.name];
        }
        return prevItems;
      });
    } else {
      alert('Barang ini tidak tersedia (stok habis).');
    }
  };

  const handleRemoveItem = (itemName) => {
    setBarangDipinjam(prevItems => prevItems.filter(name => name !== itemName)); 
  };

  return (
    <div className="flex items-center justify-center py-10 min-h-screen flex flex-col bg-gray-900">
      <div className="bg-white shadow-lg rounded-3xl p-8 max-w-lg w-full text-center transition-transform duration-300 transform hover:scale-102 border border-gray-300">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Peminjaman Barang/Kelas</h1>

        <input
          type="text"
          value={namaLengkap}
          onChange={(e) => setNamaLengkap(e.target.value)}
          placeholder="Nama Lengkap"
          className="w-full h-12 mb-4 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 text-gray-700"
        />

        <input
          type="text"
          value={kelasPeminjam}
          onChange={(e) => setKelasPeminjam(e.target.value)}
          placeholder="Kelas dan Jurusan Peminjam"
          className="w-full h-12 mb-4 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 text-gray-700"
        />

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-bold mb-5">Meminjam Barang atau Kelas?</label>
          <div className="flex justify-center space-x-4">
            <button
              className={`px-6 py-2 rounded-xl text-gray-700 font-semibold ${isBarang === true ? 'bg-teal-600 text-white shadow-md' : 'bg-gray-200 hover:bg-gray-300'} transition duration-200`}
              onClick={() => setIsBarang(true)}
            >
              Barang
            </button>
            <button
              className={`px-6 py-2 rounded-xl text-gray-700 font-semibold ${isBarang === false ? 'bg-teal-600 text-white shadow-md' : 'bg-gray-200 hover:bg-gray-300'} transition duration-200`}
              onClick={() => setIsBarang(false)}
            >
              Kelas
            </button>
          </div>
        </div>

        {isBarang !== null && (
          <>
            {isBarang ? (
              <div>
                <h2 className="text-lg font-semibold mb-2 text-gray-700">Pilih Barang:</h2>
                <ul className="bg-gray-100 rounded-2xl shadow-md p-4 mb-4">
                  {availableItems.map((item) => (
                    <li key={item.id} className="flex justify-between items-center mb-2 p-2 hover:bg-teal-200 transition duration-200 rounded-xl">
                      <span className="text-gray-700 font-semibold">{item.name} (Stok: {item.stock})</span>
                      {item.stock > 0 ? (
                        <button
                          className="text-teal-600 hover:underline text-base font-semibold"
                          onClick={() => handleSelectItem(item)}
                        >
                          Pilih
                        </button>
                      ) : (
                        <span className="text-red-500 text-sm">Habis</span>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="text-lg mt-2 mb-2 font-semibold text-gray-700">Barang Dipinjam: <span className="text-teal-600">{barangDipinjam.join(', ')}</span></p>
                <button
                  onClick={() => handleRemoveItem(barangDipinjam[barangDipinjam.length - 1])} 
                  className="mt-2 w-full h-11 px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition duration-200"
                >
                  Hapus Barang
                </button>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  value={kelasDipinjam}
                  onChange={(e) => setKelasDipinjam(e.target.value)}
                  placeholder="Kelas"
                  className="w-full h-12 mb-4 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 text-gray-700"
                />
                <input
                  type="text"
                  value={jurusan}
                  onChange={(e) => setJurusan(e.target.value)}
                  placeholder="Jurusan"
                  className="w-full h-12 mb-4 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 text-gray-700"
                />
              </>
            )}
            <button
              onClick={handleSubmit}
              className="mt-2 w-full h-11 px-6 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition duration-200"
            >
              Submit
            </button>
          </>
        )}

        {submitted && (
          <div className="mt-4">
            {isApproved ? (
              <p className="text-green-600 font-semibold text-base">Peminjaman Disetujui! Barang/Kelas dipinjam.</p>
            ) : (
              <p className="text-red-600 font-semibold text-base">Peminjaman Ditolak!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Peminjaman;

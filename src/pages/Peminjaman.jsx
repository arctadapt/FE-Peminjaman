import React, { useState, useEffect } from 'react';
import api from '../features/axios';
import API_URL from '../config/config';
import { useSnackbar } from '../components/SnackbarProvider';

const Peminjaman = () => {
  const [namaLengkap, setNamaLengkap] = useState('');
  const [kelasPeminjam, setKelasPeminjam] = useState('');
  const [itemType, setItemType] = useState(null);
  const [barangDipinjam, setBarangDipinjam] = useState([]);
  const [kelasDipinjam, setKelasDipinjam] = useState([]);
  const [isApproved, setIsApproved] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [availableItems, setAvailableItems] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const showSnackbar = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const [itemsResponse, classesResponse] = await Promise.all([
          api.get(`${API_URL}/items`, { headers }),
          api.get(`${API_URL}/class`, { headers })
        ]);

        if (classesResponse.data.status === 'success') {
          setAvailableClasses(classesResponse.data.data_class || []);
        } else {
          throw new Error(classesResponse.data.message || 'Gagal mengambil data kelas');
        }

        if (itemsResponse.data.status === 'success') {
          setAvailableItems(itemsResponse.data.data_barang || []);
        } else {
          throw new Error(itemsResponse.data.message || 'Gagal mengambil data barang');
        }
      } catch (error) {
        console.error('Error saat mengambil data:', error);
        setError(error.message || 'Terjadi kesalahan saat mengambil data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi nama dan kelas
    if (!namaLengkap.trim()) {
      showSnackbar('Mohon masukkan nama lengkap Anda', 'error');
      return;
    }

    if (!kelasPeminjam.trim()) {
      showSnackbar('Mohon masukkan kelas dan jurusan Anda', 'error');
      return;
    }

    // Validasi pemilihan barang atau kelas
    if (itemType === 'barang' && barangDipinjam.length === 0) {
      showSnackbar('Mohon pilih setidaknya satu barang untuk dipinjam', 'error');
      return;
    }

    if (itemType === 'kelas' && kelasDipinjam.length === 0) {
      showSnackbar('Mohon pilih setidaknya satu kelas untuk dipinjam', 'error');
      return;
    }

    setSubmitted(true);

    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      let response;
      if (itemType === 'barang') {
        for (const item of barangDipinjam) {
          response = await api.post(`${API_URL}/peminjaman/items`, {
            id_barang: item.id_barang,
            jumlah: item.jumlah_dipinjam,
            status: true,
            nama_peminjam: namaLengkap,
            kelas_peminjam: kelasPeminjam
          }, { headers });

          if (response.data.status !== 'success') {
            throw new Error(response.data.message || 'Peminjaman barang gagal');
          }
        }
      } else if (itemType === 'kelas') {
        for (const kelas of kelasDipinjam) {
          response = await api.post(`${API_URL}/peminjaman/class`, {
            id_kelas: kelas.id_kelas,
            status: true,
            nama_peminjam: namaLengkap,
            kelas_peminjam: kelasPeminjam
          }, { headers });

          if (response.data.status !== 'success') {
            throw new Error(response.data.message || 'Peminjaman kelas gagal');
          }
        }
      } else {
        throw new Error('Pilih jenis item terlebih dahulu');
      }

      setIsApproved(true);
      showSnackbar('Peminjaman berhasil!', 'success');
      
      // Reset form setelah berhasil
      setNamaLengkap('');
      setKelasPeminjam('');
      setBarangDipinjam([]);
      setKelasDipinjam([]);
      setItemType(null);
    } catch (error) {
      console.error('Error in borrowing:', error);
      setIsApproved(false);
      showSnackbar(error.message || 'Terjadi kesalahan saat meminjam', 'error');
    } finally {
      setSubmitted(false);
    }
  };

  const handleSelectItem = (item, type) => {
    if (type === 'barang') {
      const existingItem = barangDipinjam.find(b => b.id_barang === item.id_barang);
      if (existingItem) {
        // Jika barang sudah ada, tambahkan jumlahnya
        setBarangDipinjam(prevItems =>
          prevItems.map(b =>
            b.id_barang === item.id_barang
              ? { ...b, jumlah_dipinjam: b.jumlah_dipinjam + 1 }
              : b
          )
        );
      } else {
        // Jika barang belum ada, tambahkan ke daftar
        setBarangDipinjam(prevItems => [...prevItems, { ...item, jumlah_dipinjam: 1 }]);
      }
      // Kurangi jumlah barang yang tersedia
      setAvailableItems(prevItems =>
        prevItems.map(b =>
          b.id_barang === item.id_barang
            ? { ...b, jumlah_barang: b.jumlah_barang - 1 }
            : b
        )
      );
    } else if (type === 'kelas') {
      const isAlreadySelected = kelasDipinjam.some(k => k.id_kelas === item.id_kelas);
      if (isAlreadySelected) {
        // Jika sudah dipilih, hapus dari daftar
        setKelasDipinjam(prevClasses => prevClasses.filter(k => k.id_kelas !== item.id_kelas));
      } else {
        // Jika belum dipilih, tambahkan ke daftar jika jumlah kelas yang dipinjam kurang dari 2
        if (kelasDipinjam.length < 2) {
          setKelasDipinjam(prevClasses => [...prevClasses, item]);
        } else {
          showSnackbar('Anda hanya dapat meminjam maksimal 2 kelas', 'warning');
        }
      }
    }
  };

  const handleRemoveItem = (itemId, type) => {
    if (type === 'barang') {
      setBarangDipinjam(prevItems => {
        const removedItem = prevItems.find(item => item.id_barang === itemId);
        if (removedItem) {
          setAvailableItems(prevAvailable =>
            prevAvailable.map(item =>
              item.id_barang === itemId
                ? { ...item, jumlah_barang: item.jumlah_barang + removedItem.jumlah_dipinjam }
                : item
            )
          );
        }
        return prevItems.filter(item => item.id_barang !== itemId);
      });
    } else if (type === 'kelas') {
      setKelasDipinjam(prevClasses => {
        const removedClass = prevClasses.find(kelas => kelas.id_kelas === itemId);
        if (removedClass) {
          setAvailableClasses(prevAvailable => [...prevAvailable, removedClass]);
        }
        return prevClasses.filter(kelas => kelas.id_kelas !== itemId);
      });
    }
  };

  const handleChangeItemQuantity = (itemId, change) => {
    setBarangDipinjam(prevItems =>
      prevItems.map(item => {
        if (item.id_barang === itemId) {
          const newQuantity = Math.max(1, item.jumlah_dipinjam + change);
          const quantityDifference = newQuantity - item.jumlah_dipinjam;
          
          setAvailableItems(prevAvailable =>
            prevAvailable.map(availableItem =>
              availableItem.id_barang === itemId
                ? { ...availableItem, jumlah_barang: availableItem.jumlah_barang - quantityDifference }
                : availableItem
            )
          );

          return { ...item, jumlah_dipinjam: newQuantity };
        }
        return item;
      })
    );
  };
  
  return (
    <div className="flex items-center justify-center py-10 min-h-screen flex-col bg-gray-900">
      <div className="bg-white shadow-lg rounded-3xl p-8 max-w-lg w-full text-center transition-transform duration-300 transform hover:scale-102 border border-gray-300 -mt-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Peminjaman Barang/Kelas</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={namaLengkap}
            onChange={(e) => setNamaLengkap(e.target.value)}
            placeholder="Nama Lengkap"
            className="w-full h-12 mb-4 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 text-gray-700"
          />

          <input
            type="text"
            value={kelasPeminjam}
            onChange={(e) => setKelasPeminjam(e.target.value)}
            placeholder="Kelas dan Jurusan Peminjam"
            className="w-full h-12 mb-4 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 text-gray-700"
          />

          <div className="mb-4">
            <label className="block text-gray-700 text-xl font-bold mb-5">Meminjam Barang atau Kelas?</label>
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className={`px-6 py-2 rounded-xl text-gray-700 font-semibold ${itemType === 'barang' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 hover:bg-gray-300'} transition duration-200`}
                onClick={() => {
                  setItemType('barang');
                }}
              > 
                Barang
              </button>
              <button
                type="button"
                className={`px-6 py-2 rounded-xl text-gray-700 font-semibold ${itemType === 'kelas' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 hover:bg-gray-300'} transition duration-200`}
                onClick={() => {
                  setItemType('kelas');
                }}
              >
                Kelas
              </button>
            </div>
          </div>

          {itemType === 'barang' && (
            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-700">Pilih Barang:</h2>
              {isLoading ? (
                <p className="text-gray-600">Memuat data...</p>
              ) : error ? (
                <p className="text-red-500">Error: {error}</p>
              ) : (
                <ul className="bg-gray-100 rounded-2xl shadow-md p-4 mb-4 max-h-60 overflow-y-auto">
                  {availableItems.map((item) => (
                    <li key={item.id_barang} className="flex justify-between items-center mb-2 p-2 hover:bg-blue-200 transition duration-200 rounded-xl">
                      <span className="text-gray-700 font-semibold">{item.nama_barang} (Stok: {item.jumlah_barang})</span>
                      {item.jumlah_barang > 0 ? (
                        <button
                          type="button"
                          className="text-blue-600 hover:underline text-base font-semibold"
                          onClick={() => handleSelectItem(item, 'barang')}
                        >
                          Pilih
                        </button>
                      ) : (
                        <span className="text-red-500 text-sm">Habis</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-lg mt-2 mb-2 font-semibold text-gray-700">Barang Dipinjam:</p>
              <ul className="bg-gray-100 rounded-2xl shadow-md p-4 mb-4 max-h-60 overflow-y-auto">
                {barangDipinjam.map((item) => (
                  <li key={item.id_barang} className="flex justify-between items-center mb-2 p-2">
                    <span className="text-gray-700">{item.nama_barang}</span>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => handleChangeItemQuantity(item.id_barang, -1)}
                        className="px-2 py-1 bg-red-500 text-white rounded-l"
                        disabled={item.jumlah_dipinjam <= 1}
                      >
                        -
                      </button>
                      <span className="px-3 py-1 bg-gray-200 text-gray-800">{item.jumlah_dipinjam}</span>
                      <button
                        type="button"
                        onClick={() => handleChangeItemQuantity(item.id_barang, 1)}
                        className="px-2 py-1 bg-green-500 text-white rounded-r"
                        disabled={item.jumlah_dipinjam >= availableItems.find(i => i.id_barang === item.id_barang).jumlah_barang + item.jumlah_dipinjam}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id_barang, 'barang')}
                        className="ml-2 px-2 py-1 bg-red-600 text-white rounded"
                      >
                        Batal
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

        {itemType === 'kelas' && (
          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Pilih Kelas (Maksimal 2):</h2>
            {isLoading ? (
              <p className="text-gray-600">Memuat data...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : availableClasses.length === 0 ? (
              <p className="text-gray-600">Tidak ada kelas tersedia</p>
            ) : (
              <ul className="bg-gray-100 rounded-2xl shadow-md p-4 mb-4 max-h-60 overflow-y-auto">
                {availableClasses.map((kelas) => {
                  const isSelected = kelasDipinjam.some(k => k.id_kelas === kelas.id_kelas);
                  const isAvailable = kelas.status_kelas === 'Ada';
                  const isDisabled = !isSelected && kelasDipinjam.length >= 2;

                  return (
                    <li 
                      key={kelas.id_kelas} 
                      className={`flex justify-between items-center mb-2 p-2 rounded-xl ${
                        isAvailable 
                          ? `cursor-pointer transition duration-200 ${isSelected ? 'bg-blue-200' : isDisabled ? 'bg-gray-300' : 'hover:bg-blue-100'}` 
                          : 'bg-gray-200'
                      }`}
                      onClick={() => isAvailable && !isDisabled && handleSelectItem(kelas, 'kelas')}
                    >
                      <span className={`font-semibold ${isAvailable ? 'text-gray-700' : 'text-gray-500'}`}>
                        {kelas.kelas_jurusan}
                      </span>
                      <span className={`text-sm ${
                        isAvailable 
                          ? (isSelected ? 'text-green-600' : isDisabled ? 'text-gray-500' : 'text-blue-600') 
                          : 'text-red-500'
                      }`}>
                        {isAvailable 
                          ? (isSelected ? 'Dipilih' : isDisabled ? 'Batas Tercapai' : 'Pilih') 
                          : 'Tidak Tersedia'
                        }
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
            
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Kelas Dipilih:</h2>
            <ul className="bg-gray-100 rounded-2xl shadow-md p-4 mb-4 max-h-60 overflow-y-auto">
              {kelasDipinjam.map((kelas) => (
                <li 
                  key={kelas.id_kelas} 
                  className="flex justify-between items-center mb-2 p-2 rounded-xl"
                >
                  <span className="font-semibold text-gray-700">
                    {kelas.kelas_jurusan}
                  </span>
                  <button
                    onClick={() => handleSelectItem(kelas, 'kelas')}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                  >
                    Hapus
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          className="mt-2 w-full h-11 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>

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

import React, { useState, useEffect } from 'react';
import api from '../features/axios';
import API_URL from '../config/config';
import { useSnackbar } from '../components/SnackbarProvider';

const Peminjaman = () => {
  const [namaLengkap, setNamaLengkap] = useState('');
  const [kelasPeminjam, setKelasPeminjam] = useState('');
  const [itemType, setItemType] = useState(null);
  const [barangDipinjam, setBarangDipinjam] = useState([]);
  const [RuanganDipinjam, setRuanganDipinjam] = useState([]);
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
          // Filter hanya ruangan yang tersedia
          const availableRooms = classesResponse.data.data_class.filter(
            ruangan => ruangan.status_ruangan === 'Tersedia'
          );
          setAvailableClasses(availableRooms || []);
        } else {
          throw new Error(classesResponse.data.message || 'Gagal mengambil data ruangan');
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

    // Validasi untuk peminjaman barang
    if (itemType === 'barang' && barangDipinjam.length === 0) {
      showSnackbar('Mohon pilih setidaknya satu barang untuk dipinjam', 'error');
      return;
    }

    // Validasi untuk peminjaman ruangan
    if (itemType === 'ruangan' && RuanganDipinjam.length === 0) {
      showSnackbar('Mohon pilih setidaknya satu ruangan untuk dipinjam', 'error');
      return;
    }

    setSubmitted(true);
    setIsApproved(null);

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
      } else if (itemType === 'ruangan') {
        for (const ruangan of RuanganDipinjam) {
          response = await api.post(`${API_URL}/peminjaman/class`, {
            id_ruangan: ruangan.id_ruangan,
            status: true,
            nama_peminjam: namaLengkap,
            kelas_peminjam: kelasPeminjam
          }, { headers });

          if (response.data.status !== 'success') {
            throw new Error(response.data.message || 'Peminjaman ruangan gagal');
          }
        }
      } else {
        throw new Error('Pilih jenis item terlebih dahulu');
      }

      setIsApproved(true);
      showSnackbar('Peminjaman berhasil! Tunggu konfirmasi dari ADMIN', 'success');

      // Reset form
      setNamaLengkap('');
      setKelasPeminjam('');
      setBarangDipinjam([]);
      setRuanganDipinjam([]);
      setItemType(null);
    } catch (error) {
      console.error('Error in borrowing:', error);
      setIsApproved(false);
      showSnackbar(error.message || 'Terjadi kesalahan saat meminjam', 'error');
    } finally {
      setSubmitted(true);
    }
  };

  const handleSelectItem = (item, type) => {
    if (type === 'barang') {
      const existingItem = barangDipinjam.find(b => b.id_barang === item.id_barang);
      if (existingItem) {
        setBarangDipinjam(prevItems =>
          prevItems.map(b =>
            b.id_barang === item.id_barang
              ? { ...b, jumlah_dipinjam: b.jumlah_dipinjam + 1 }
              : b
          )
        );
      } else {
        setBarangDipinjam(prevItems => [...prevItems, { ...item, jumlah_dipinjam: 1 }]);
      }
      setAvailableItems(prevItems =>
        prevItems.map(b =>
          b.id_barang === item.id_barang
            ? { ...b, jumlah_barang: b.jumlah_barang - 1 }
            : b
        )
      );
    } else if (type === 'ruangan') {
      const isAlreadySelected = RuanganDipinjam.some(r => r.id_ruangan === item.id_ruangan);
      if (isAlreadySelected) {
        setRuanganDipinjam(prevClasses => prevClasses.filter(r => r.id_ruangan !== item.id_ruangan));
      } else {
        if (RuanganDipinjam.length < 2) {
          setRuanganDipinjam(prevClasses => [...prevClasses, item]);
        } else {
          showSnackbar('Anda hanya dapat meminjam maksimal 2 ruangan', 'warning');
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
    } else if (type === 'ruangan') {
      setRuanganDipinjam(prevClasses => prevClasses.filter(ruangan => ruangan.id_ruangan !== itemId));
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
    <div className="flex items-center justify-center py-10 min-h-screen flex-col bg-[#d9d9d9]">
      <div className="bg-white shadow-lg rounded-3xl p-8 max-w-lg w-full text-center transition-transform duration-300 transform hover:scale-102 border border-gray-300 -mt-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Peminjaman Barang/Ruangan</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-xl font-bold mb-5">Meminjam Barang atau Ruangan?</label>
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className={`px-6 py-2 rounded-xl text-gray-700 font-semibold ${itemType === 'barang' ? 'bg-red-600 text-white shadow-md' : 'bg-gray-200 hover:bg-gray-300'} transition duration-200`}
                onClick={() => {
                  setItemType('barang');
                }}
              > 
                Barang
              </button>
              <button
                type="button"
                className={`px-6 py-2 rounded-xl text-gray-700 font-semibold ${itemType === 'ruangan' ? 'bg-red-600 text-white shadow-md' : 'bg-gray-200 hover:bg-gray-300'} transition duration-200`}
                onClick={() => {
                  setItemType('ruangan');
                }}
              >
                Ruangan
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
                    <li key={item.id_barang} className="flex justify-between items-center mb-2 p-2 hover:bg-red-200 transition duration-200 rounded-xl">
                      <span className="text-gray-700 font-semibold">{item.nama_barang} (Stok: {item.jumlah_barang})</span>
                      {item.jumlah_barang > 0 ? (
                        <button
                          type="button"
                          className="text-red-600 hover:underline text-base font-semibold"
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

{itemType === 'ruangan' && (
          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Pilih Ruangan (Maksimal 2):</h2>
            {isLoading ? (
              <p className="text-gray-600">Memuat data...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : availableClasses.length === 0 ? (
              <p className="text-gray-600">Tidak ada Ruangan tersedia</p>
            ) : (
              <ul className="bg-gray-100 rounded-2xl shadow-md p-4 mb-4 max-h-60 overflow-y-auto">
                {availableClasses.map((ruangan) => {
                  const isSelected = RuanganDipinjam.some(k => k.id_ruangan === ruangan.id_ruangan);
                  const isDisabled = !isSelected && RuanganDipinjam.length >= 2;

                  return (
                    <li 
                      key={ruangan.id_ruangan} 
                      className={`flex justify-between items-center mb-2 p-2 rounded-xl ${
                        isSelected ? 'bg-red-200' : isDisabled ? 'bg-gray-300' : 'hover:bg-red-100 cursor-pointer'
                      }`}
                      onClick={() => !isDisabled && handleSelectItem(ruangan, 'ruangan')}
                    >
                      <span className="font-semibold text-gray-700">
                        {ruangan.nama_ruangan}
                      </span>
                      <span className={`text-sm ${
                        isSelected 
                          ? 'text-green-600' 
                          : isDisabled 
                            ? 'text-gray-500' 
                            : 'text-red-600'
                      }`}>
                        {isSelected 
                          ? 'Dipilih' 
                          : isDisabled 
                            ? 'Batas Tercapai' 
                            : 'Pilih'
                        }
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
            
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Ruangan Dipilih:</h2>
            <ul className="bg-gray-100 rounded-2xl shadow-md p-4 mb-4 max-h-60 overflow-y-auto">
              {RuanganDipinjam.map((ruangan) => (
                <li 
                  key={ruangan.id_ruangan} 
                  className="flex justify-between items-center mb-2 p-2 rounded-xl"
                >
                  <span className="font-semibold text-gray-700">
                    {ruangan.nama_ruangan}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(ruangan.id_ruangan, 'ruangan')}
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
          className="mt-2 w-full h-11 px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition duration-200"
        >
          Submit
        </button>
      </form>

      {submitted && (
        <div className="mt-4">
          {isApproved === true ? (
            <p className="text-green-600 font-semibold text-base">Peminjaman Disetujui! Barang/Ruangan dipinjam.</p>
          ) : isApproved === false ? (
            <p className="text-red-600 font-semibold text-base">Peminjaman Ditolak!</p>
          ) : null}
        </div>
      )}
    </div>
  </div>
  );
};

export default Peminjaman;
import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, useMediaQuery, useTheme } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import api from '../features/axios';
import API_URL from '../config/config';

const Search = ({ searchKeyword, setSearchKeyword, handleSearch, placeholder }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleChange = (e) => {
    setSearchKeyword(e.target.value);
    if (e.target.value === '') {
      handleSearch(); // Trigger search when input is cleared
    }
  };

  return (
    <Box 
      sx={{
        display: "flex",
        p: isMobile ? 0.5 : 1,
        borderRadius: 1,
        boxShadow: 2,
        width: isMobile ? "100%" : "100%",
        "&:hover": {
          boxShadow: 4,
        },
      }}
    >
      <TextField
        label={placeholder}
        variant="outlined"
        value={searchKeyword}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            borderRadius: 1,
            backgroundColor: "#ffffff",
            "& fieldset": {
              borderColor: "#ced4da",
            },
            "&:hover fieldset": {
              borderColor: "#f50202",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#f50202",
            },
          },
          "& .MuiInputLabel-outlined": {
            fontSize: isMobile ? "0.75rem" : "0.875rem",
          },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "#f50202",
          },
          "& .MuiOutlinedInput-input": {
            fontSize: isMobile ? "0.75rem" : "0.875rem",
            padding: isMobile ? "6px" : "6px",
          },
        }}
        size="small"
      />
      <Button 
        variant="contained"
        color="error"
        onClick={handleSearch}
        sx={{
          ml: isMobile ? 0.5 : 1, 
          fontSize: isMobile ? "0.65rem" : "0.75rem",  
          padding: isMobile ? '3px 10px' : '5px 15px', 
          minWidth: '40px', 
          backgroundColor: theme.palette.error.main, 
          '&:hover': {
            backgroundColor: theme.palette.error.dark, 
          },
        }}
      >
        <FaSearch fontSize="small" />
      </Button>
    </Box>
  );
};

const Tersedia = () => {
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ruanganFilter, setRuanganFilter] = useState('');
  const [ruanganStatusFilter, setRuanganStatusFilter] = useState('available');
  const [barangFilter, setBarangFilter] = useState('');
  const [barangStatusFilter, setBarangStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const [itemSearchKeyword, setItemSearchKeyword] = useState('');
  const [roomSearchKeyword, setRoomSearchKeyword] = useState('');

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
          setFilteredItems(sortItems(items));
        }

        if (classesResponse.data.status === 'success') {
          setClasses(classesResponse.data.data_class);
          setFilteredClasses(classesResponse.data.data_class);
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

  const handleItemSearch = () => {
    if (itemSearchKeyword === '') {
      setFilteredItems(allItems);
    } else {
      const searchTerm = itemSearchKeyword.toLowerCase();
      const filtered = allItems.filter(item => 
        item.nama_barang.toLowerCase().includes(searchTerm) ||
        item.tipe_barang.toLowerCase().includes(searchTerm)
      );
      setFilteredItems(filtered);
    }
  };

  const handleRoomSearch = () => {
    if (roomSearchKeyword === '') {
      setFilteredClasses(classes);
    } else {
      const searchTerm = roomSearchKeyword.toLowerCase();
      const filtered = classes.filter(room => 
        room.nama_ruangan.toLowerCase().includes(searchTerm) ||
        room.tipe_ruangan.toLowerCase().includes(searchTerm)
      );
      setFilteredClasses(filtered);
    }
  };

  const sortItems = (items) => {
    return items.sort((a, b) => {
      if (a.jumlah_barang > 0 && b.jumlah_barang === 0) return -1;
      if (a.jumlah_barang === 0 && b.jumlah_barang > 0) return 1;
      
      if (sortOrder === 'asc') {
        return a.nama_barang.localeCompare(b.nama_barang);
      } else {
        return b.nama_barang.localeCompare(a.nama_barang);
      }
    });
  };

  const filterItems = () => {
    return filteredItems.filter(barang => {
      const matchesBarangFilter = 
        barangFilter === '' || 
        barang.tipe_barang.toLowerCase() === barangFilter.toLowerCase();
      
      const matchesBarangStatusFilter = 
        barangStatusFilter === 'all' ||
        (barangStatusFilter === 'available' && barang.jumlah_barang > 0) ||
        (barangStatusFilter === 'unavailable' && barang.jumlah_barang === 0);
      
      return matchesBarangFilter && matchesBarangStatusFilter;
    });
  };

  const filterRooms = () => {
    return filteredClasses.filter(ruangan => {
      // Exact match for room type filter
      const matchesRuanganFilter = 
        ruanganFilter === '' || 
        ruangan.tipe_ruangan === ruanganFilter;
      
      const matchesStatusFilter = 
        ruanganStatusFilter === 'all' ||
        (ruanganStatusFilter === 'available' && ruangan.status_ruangan === 'Tersedia') ||
        (ruanganStatusFilter === 'unavailable' && ruangan.status_ruangan !== 'Tersedia');
      
      return matchesRuanganFilter && matchesStatusFilter;
    });
  };

  if (isLoading) {
    return <div className="text-white text-center">Memuat data...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  const finalFilteredItems = filterItems();
  const finalFilteredRooms = filterRooms();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#d9d9d9] p-4 sm:p-8">
      <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 w-full max-w-7xl">
        {/* Bagian Barang */}
        <div className="w-full lg:w-1/2 bg-white shadow-2xl rounded-[0.5rem] p-6 sm:p-8 transition-all duration-300 hover:shadow-red-500/20 border-2">
          <div className="flex justify-between items-center mb-6 border-b-2 border-red-500 pb-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Barang</h2>
          </div>

          <div className="mb-4">
            <Search 
              searchKeyword={itemSearchKeyword}
              setSearchKeyword={setItemSearchKeyword}
              handleSearch={handleItemSearch}
              placeholder="Cari Barang..."
            />
          </div>
          
          <div className="mb-4">
            <select
              value={barangFilter}
              onChange={(e) => setBarangFilter(e.target.value)}
              className="w-full px-4 py-2 border rounded-[0.5rem] shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="">Semua Barang</option>
              <option value="alat">Alat</option>
              <option value="eskul">Eskul</option>
            </select>
          </div>

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

          {finalFilteredItems.length > 0 ? (
            <ul className="space-y-4 overflow-y-auto max-h-[50vh]">
              {finalFilteredItems.map((item) => (
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
            <p className="text-gray-600 text-center italic border border-gray-300 rounded-[0.5rem] p-4">
              Tidak ada barang tersedia saat ini.
            </p>
          )}
        </div>

        {/* Bagian Ruangan */}
        <div className="w-full lg:w-1/2 bg-white shadow-2xl rounded-[0.5rem] p-6 sm:p-8 transition-all duration-300 hover:shadow-gray-500/20 border-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b-2 border-red-500 pb-2">
            Ruangan
          </h2>

          <div className="mb-4">
            <Search 
              searchKeyword={roomSearchKeyword}
              setSearchKeyword={setRoomSearchKeyword}
              handleSearch={handleRoomSearch}
              placeholder="Cari Ruangan..."
            />
          </div>
            
          <div className="mb-4">
            <select
              value={ruanganFilter}
              onChange={(e) => setRuanganFilter(e.target.value)}
              className="w-full px-4 py-2 border rounded-[0.5rem] shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="">Semua Ruangan</option>
              <option value="umum">Umum</option>
              <option value="kelas X">kelas X</option>
              <option value="kelas XI">kelas XI</option>
              <option value="kelas XII">kelas XII</option>
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

          {finalFilteredRooms.length > 0 ? (
            <ul className="space-y-4 overflow-y-auto max-h-[50vh]">
              {finalFilteredRooms.map((ruangan) => (
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
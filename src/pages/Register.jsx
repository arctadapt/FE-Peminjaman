import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import api from '../features/axios';
import API_URL from '../config/config';
import { useSnackbar } from "../components/SnackbarProvider";

const Register = () => {
  const [error, setError] = useState(null);
  const showSnackbar = useSnackbar();

  const handleRegister = async (nama_lengkap, kelas, password) => {
    try {
      const response = await api.post(`${API_URL}/users/register`, {
        nama_lengkap,
        kelas,
        password,
      });

      // Tampilkan notifikasi keberhasilan dengan warna hijau
      showSnackbar(response.data.message, 'success'); // Use 'success' type
      setError(null); // Clear error if registration is successful
    } catch (error) {
      // Tampilkan notifikasi kesalahan dengan warna merah
      showSnackbar(error.response?.data?.message || 'Terjadi kesalahan saat registrasi', 'error'); // Use 'error' type
      setError(''); // Clear error state
    }
  };

  return (
    <div>
      <AuthForm isLogin={false} onSubmit={handleRegister} />
    </div>
  );
};

export default Register;

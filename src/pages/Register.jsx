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

      showSnackbar(response.data.message, 'success');
      setError(null);
    } catch (error) {
      showSnackbar(error.response?.data?.message || 'Terjadi kesalahan saat registrasi', 'error');
      setError('');
    }
  };

  return (
    <div>
      <AuthForm isLogin={false} onSubmit={handleRegister} />
    </div>
  );
};

export default Register;

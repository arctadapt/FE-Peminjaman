import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthForm from '../components/AuthForm';
import { useSnackbar } from '../components/SnackbarProvider';

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const showSnackbar = useSnackbar(); // Menggunakan useSnackbar

  const handleLogin = async (nama_lengkap, password) => {
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        nama_lengkap,
        password
      });
  
      // Cek apakah respon menunjukkan keberhasilan
      if (response.status === 200 && response.data.status === 'success') {
        // Simpan data pengguna di localStorage
        localStorage.setItem('userData', JSON.stringify(response.data.data));
        console.log('Login sukses:', response.data);
        
        // Arahkan pengguna ke dashboard
        navigate('/dashboard');
      } else {
        // Tampilkan notifikasi jika login tidak berhasil
        setError(response.data.error || 'Invalid credentials. Please try again.');
        showSnackbar(response.data.error || 'Invalid credentials. Please try again.', 'error'); // Menampilkan Snackbar
      }
    } catch (error) {
      console.error('Login error:', error);
  
      if (error.response) {
        const status = error.response.status;
  
        // Tangani kode status tertentu (misalnya, 400, 404, 500)
        if (status === 400) {
          setError('Nama Lengkap atau Password salah!');
          showSnackbar('Nama Lengkap atau Password salah!', 'error'); // Menampilkan Snackbar
        } else if (status === 404) {
          setError('User not found. Please check your credentials.');
          showSnackbar('User not found. Please check your credentials.', 'error'); // Menampilkan Snackbar
        } else if (status === 500) {
          setError('Internal server error. Please try again later.');
          showSnackbar('Internal server error. Please try again later.', 'error'); // Menampilkan Snackbar
        } else {
          setError(error.response.data.error || 'An error occurred during login');
          showSnackbar(error.response.data.error || 'An error occurred during login', 'error'); // Menampilkan Snackbar
        }
      } else if (error.request) {
        setError('No response from server. Please try again.');
        showSnackbar('No response from server. Please try again.', 'error'); // Menampilkan Snackbar
      } else {
        setError('An error occurred. Please try again.');
        showSnackbar('An error occurred. Please try again.', 'error'); // Menampilkan Snackbar
      }
    }
  };  

  return (
    <div>
      <AuthForm isLogin={true} onSubmit={handleLogin} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;

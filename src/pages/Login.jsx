import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser, reset } from '../features/AuthSlice';
import AuthForm from '../components/AuthForm';
import { useSnackbar } from '../components/SnackbarProvider';

const Login = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showSnackbar = useSnackbar();
  const { user, token, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log('Login effect triggered:', { isSuccess, user, token, isError, message });
    if (isSuccess && user && token) {
      console.log('Login successful, navigating to dashboard');
      showSnackbar('Login berhasil!', 'success');
      navigate('/dashboard');
    } else if (isError) {
      console.log('Login error occurred');
      showSnackbar(message || 'Login gagal. Silakan coba lagi.', 'error');
      setError(message || 'Login gagal. Silakan coba lagi.');
    }
    
    return () => {
      dispatch(reset());
    };
  }, [isSuccess, isError, user, token, message, navigate, showSnackbar, dispatch]);

  const handleLogin = async (nama_lengkap, password) => {
    try {
      console.log('Attempting login with:', { nama_lengkap, password });
      const result = await dispatch(LoginUser({ nama_lengkap, password })).unwrap();
      console.log('Login result:', result);
      if (result.token) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login gagal. Silakan coba lagi.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AuthForm isLogin={true} onSubmit={handleLogin} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;

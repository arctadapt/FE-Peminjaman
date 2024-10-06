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
    if (isSuccess && user && token) {
      showSnackbar('Login berhasil!', 'success');
      navigate('/dashboard');
    } else if (isError) {
      showSnackbar(message || 'Login gagal. Silakan coba lagi.', 'error');
      setError(message || 'Login gagal. Silakan coba lagi.');
    }
    
    return () => {
      dispatch(reset());
    };
  }, [isSuccess, isError, user, token, message, navigate, showSnackbar, dispatch]);

  const handleLogin = async (nama_lengkap, password) => {
    try {
      await dispatch(LoginUser({ nama_lengkap, password })).unwrap();
    } catch (error) {
      console.error('Login error:', error);
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

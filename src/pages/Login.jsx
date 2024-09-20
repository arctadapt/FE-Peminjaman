import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    console.log('Login:', { email, password });
    navigate('/dashboard');
  };

  return <AuthForm isLogin={true} onSubmit={handleLogin} />;
};

export default Login;

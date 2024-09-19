import React from 'react';
import AuthForm from '../components/AuthForm';

const Login = () => {
  const handleLogin = (email, password) => {
    console.log('Login:', { email, password });
  };

  return <AuthForm isLogin={true} onSubmit={handleLogin} />;
};

export default Login;

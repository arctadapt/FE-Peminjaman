import React from 'react';
import AuthForm from '../components/AuthForm';

const Register = () => {
  const handleRegister = (email, password) => {
    console.log('Register:', { email, password });
  };

  return <AuthForm isLogin={false} onSubmit={handleRegister} />;
};

export default Register;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEye, FaEyeSlash, FaRegBuilding } from 'react-icons/fa';

const AuthForm = ({ isLogin, onSubmit }) => {
  const [kelas, setKelas] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      onSubmit(username, password);
    } else {
      onSubmit(username, kelas, password);  
    }
  
    navigate('/dashboard');
  };  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0F67B1]">
      <div className="w-full max-w-lg p-8 bg-gradient-to-r from-white to-gray-200 rounded-3xl shadow-lg">
        <img className="w-50 h-50 mx-auto -mt-28 mb-11 rounded-full bg-[#0F67B1]" src='/public/unnamed.png' alt=''></img>
        <h2 className="text-2xl font-bold text-center mb-7 text-gradient"> 
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Nama Lengkap</label>
            <div className="relative">
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required
                className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
              />
              <i className="absolute top-4 right-5 text-gray-500"><FaUser /></i>
            </div>
          </div>

          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Kelas</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={kelas} 
                  onChange={(e) => setKelas(e.target.value)} 
                  required 
                  className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
                />
                <i className="absolute top-4 right-5 text-gray-500"><FaRegBuilding /></i>
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
              />
              <i onClick={togglePasswordVisibility} className="absolute top-4 right-5 text-gray-500 cursor-pointer">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </i>
            </div>
          </div>

          <button type="submit" className="w-full py-3 bg-[#0F67B1] text-white font-bold rounded-2xl hover:bg-blue-700 transition duration-300">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <div className="text-center mt-4">
          {isLogin ? (
            <p className="text-gray-600 font-semibold">
              Don't have an account?{' '}
              <a onClick={() => navigate('/register')} className="text-blue-600 font-bold cursor-pointer">Register</a>
            </p>
          ) : (
            <p className="text-gray-600 font-semibold">
              Already have an account?{' '}
              <a onClick={() => navigate('/')} className="text-blue-600 font-bold cursor-pointer">Login</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

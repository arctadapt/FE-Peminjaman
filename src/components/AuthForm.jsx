import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEye, FaEyeSlash, FaRegBuilding } from 'react-icons/fa';

const AuthForm = ({ isLogin, onSubmit }) => {
  const [username, setUsername] = useState('');
  const [kelas, setKelas] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col justify-center px-16 bg-white">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-4">
            {isLogin ? 'Welcome Back!' : 'Welcome!'}
          </h1>
          <p className="text-gray-600 mb-6">
            {isLogin
              ? 'The earlier you borrow, the more options you have!'
              : 'Use this website now for a smoother borrowing experience!'}
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  placeholder="Masukan Nama Lengkap!"
                />
                <i className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                  <FaUser />
                </i>
              </div>
            </div>

            {!isLogin && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Kelas</label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    placeholder="Masukan Kelas Kamu!"
                  />
                  <i className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                    <FaRegBuilding />
                  </i>
                </div>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  placeholder="Masukan Password Kamu!"
                />
                <i
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </i>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            {isLogin ? (
              <>
                Don’t have an account?{' '}
                <a
                  onClick={() => navigate('/register')}
                  className="text-red-600 font-medium hover:underline cursor-pointer"
                >
                  Sign up
                </a>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <a
                  onClick={() => navigate('/')}
                  className="text-red-600 font-medium hover:underline cursor-pointer"
                >
                  Login
                </a>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 relative">
        <img
          src="landing.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AuthForm;
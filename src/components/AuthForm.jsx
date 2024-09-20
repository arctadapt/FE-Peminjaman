import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaUser, FaPhone, FaEye, FaEyeSlash, FaRegBuilding } from 'react-icons/fa'; 
import styles from './AuthForm.module.css';

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
    <div className={styles.container}>
      <div className={styles.formBox}>
        <img className={styles.image} src='/public/unnamed.png' alt=''></img>
        <h2 className={styles.heading}>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          
          <div className={styles.inputGroup}>
            <label>Nama Lengkap</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
            <i><FaUser /></i>
          </div>

          {!isLogin && (
            <div className={styles.inputGroup}>
              <label>Kelas</label>
              <input 
                type="text" 
                value={kelas} 
                onChange={(e) => setKelas(e.target.value)} 
                required 
              />
              <i><FaRegBuilding /></i>
            </div>
          )}

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input 
              type={showPassword ? 'text' : 'password'} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <i onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </i>
          </div>

          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <div className={styles.switchLink}>
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <a onClick={() => navigate('/register')}>Register</a>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <a onClick={() => navigate('/login')}>Login</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

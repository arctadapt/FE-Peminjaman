import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa'; 
import styles from './AuthForm.module.css';

const AuthForm = ({ isLogin, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Only for register form
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      onSubmit(email, password);
    } else {
      onSubmit(username, phone, email, password);  // Include additional fields for register
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h2 className={styles.heading}>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          
          {!isLogin && (
            <>
              <div className={styles.inputGroup}>
                <label>Username</label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required={!isLogin} 
                />
                <i><FaUser /></i>
              </div>
              <div className={styles.inputGroup}>
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  required={!isLogin} 
                />
                <i><FaPhone /></i>
              </div>
            </>
          )}

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <i><FaEnvelope /></i>
          </div>

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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa'; 
import styles from './AuthForm.module.css';

const AuthForm = ({ isLogin, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!username) {
        newErrors.username = 'Username is required';
      }

      if (!phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^[0-9]+$/.test(phone)) {
        newErrors.phone = 'Phone number is invalid';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isLogin) {
        onSubmit(email, password);
      } else {
        onSubmit(username, phone, email, password);  
      }
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
                />
                <i><FaUser /></i>
                {errors.username && <span className={styles.error}>{errors.username}</span>}
              </div>
              <div className={styles.inputGroup}>
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                />
                <i><FaPhone /></i>
                {errors.phone && <span className={styles.error}>{errors.phone}</span>}
              </div>
            </>
          )}

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <i><FaEnvelope /></i>
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input 
              type={showPassword ? 'text' : 'password'} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <i onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </i>
            {errors.password && <span className={styles.error}>{errors.password}</span>}
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

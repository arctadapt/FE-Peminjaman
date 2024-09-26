import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.className = savedTheme;
    }
  }, []);

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.className = newTheme;
    localStorage.setItem('theme', newTheme); 
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="flex items-center">
        <label className="mr-4">Toggle Dark Mode</label>
        <button
          onClick={handleThemeChange}
          className={`p-2 rounded-lg ${theme === 'light' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
        >
          {theme === 'light' ? 'Enable Dark Mode' : 'Enable Light Mode'}
        </button>
      </div>
    </div>
  );
};

export default Settings;

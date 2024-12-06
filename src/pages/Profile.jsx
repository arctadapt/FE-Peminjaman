import React from "react";
import avatar from "../avatar.svg";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const Profile = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  
  const userData = location.state?.userData;

  if (!userData) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="p-8 max-w-md w-full bg-white rounded-2xl shadow-lg space-y-6">
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 rounded border-4 border-gray-100 shadow-md"
            src={avatar}
            alt="Profile Avatar"
          />
          <h1 className="mt-4 text-2xl font-bold text-gray-800">{userData.nama_lengkap}</h1>
        </div>
          <div className="bg-gray-200 p-6 rounded-xl shadow-inner space-y-4">
        <div className="flex items-center space-x-3">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            <p className="text-gray-700"><span className="font-semibold">Kelas/Jabatan:</span> {userData.kelas}</p>
          </div>
        <div className="flex items-center space-x-3">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            <p className="text-gray-700"><span className="font-semibold">Role:</span> {userData.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
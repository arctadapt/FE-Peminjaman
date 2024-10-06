import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import avatar from "../avatar.svg";
import { useSelector } from 'react-redux';
import api from "../features/axios";
import API_URL from "../config/config";

const Profile = () => {
  const { isError, user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (!isError && user) {
      const fetchData = async () => {
        try {
          const response = await api.get(`${API_URL}/users/${id}`);
          const data = response.data.data.user;

        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
  
      fetchData();
    }
  }, [id, isError, user]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  if (!user) {
    return <div className="text-white">User tidak ditemukan</div>;
  }

  return (
    <div className="flex items-center justify-center py-10 min-h-screen flex-col bg-gray-900">
      <div className="bg-white p-12 rounded-3xl shadow-xl max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Profile</h1>
        <div className="mb-6">
          <img
            className="w-36 h-36 rounded-3xl mx-auto"
            src={avatar}
            alt="Profile Avatar"
          />
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-800">{user.nama_lengkap}</p>
          <p className="text-lg text-gray-600">{user.role}</p>
          <p className="text-lg text-gray-600">{user.kelas}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
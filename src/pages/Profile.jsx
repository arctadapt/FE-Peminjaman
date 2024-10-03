import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import avatar from "../avatar.svg"

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setError("User ID tidak valid");
        setLoading(false);
        return;
      }

      try {
        const userDataString = localStorage.getItem('userData');
        if (!userDataString) {
          throw new Error('User tidak terautentikasi');
        }
        const userData = JSON.parse(userDataString);
        
        if (parseInt(userId) !== userData.id) {
          throw new Error('Anda tidak memiliki akses ke profil ini');
        }

        const response = await axios.get(`http://localhost:3001/users/${userId}`, {
          headers: {
            'X-User-Id': userData.id.toString()
          }
        });

        if (response.data.status === "success") {
          setUser(response.data.data.user);
        } else {
          setError(response.data.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response && error.response.status === 401) {
          setError("Sesi Anda telah berakhir. Silakan login kembali.");
          navigate('/login');
        } else {
          setError(error.message || "Terjadi kesalahan saat mengambil data pengguna");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, navigate]);

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
        </div>
      </div>
    </div>
  );
};

export default Profile;
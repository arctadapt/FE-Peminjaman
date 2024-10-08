import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import api from "../features/axios";
import API_URL from "../config/config";

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const { user: authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!authUser || !authUser.token) {
        navigate('/');
        return;
      }

      try {
        const response = await api.get(`${API_URL}/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${authUser.token}`,
            'x-user-id': authUser.id
          }
        });
        setUser(response.data.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user profile");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, authUser, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.nama_lengkap}</h1>
      <p>Role: {user.role}</p>
      <p>Kelas: {user.kelas}</p>
      {/* Add more user details as needed */}
    </div>
  );
};

export default Profile;
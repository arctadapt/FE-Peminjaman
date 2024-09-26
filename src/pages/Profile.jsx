import React from "react";

const Profile = () => {
  return (
    <div className="flex items-center justify-center py-10 min-h-screen flex flex-col bg-gray-900">
      <div className="bg-white p-12 rounded-3xl shadow-xl max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Profile</h1>
        <div className="mb-6">
          <img
            className="w-36 h-36 rounded-full mx-auto"
            src="./public/profile.jpg"
            alt="Profile Avatar"
          />
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-800">Zeta Lawrance</p>
          <p className="text-lg text-gray-600">Administrator</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

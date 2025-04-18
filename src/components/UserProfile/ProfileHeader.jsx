import React from 'react';
import { FaUser, FaCamera, FaEdit } from 'react-icons/fa';

const ProfileHeader = ({ user, profileImage, fileInputRef, handleImageUpload, setIsEditing }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-blue-500 overflow-hidden shadow-md">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-blue-200 text-white text-2xl">
                <FaUser />
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-0 right-0 bg-white border border-gray-300 p-1 rounded-full hover:bg-gray-100"
          >
            <FaCamera className="text-gray-600 text-sm" />
          </button>
          <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
        </div>
        <div>
          <h1 className="font-bold text-xl text-sky-500 my-3 border border-b-2 border-sky-600 border-t-0 border-x-0">
            Account Information
          </h1>
          <p className="text-gray-600">
            <span className="font-bold text-lg">Name: </span> {user.name}
          </p>
          <p className="text-gray-600">
            <span className="font-bold text-lg">Email: </span> {user.email}
          </p>
          <p className="text-gray-600">
            <span className="font-bold text-lg">Phone: </span> {user.phone}
          </p>
          <p className="text-gray-600">
            <span className="font-bold text-lg">Address: </span> {user.address}
          </p>
        </div>
      </div>
      <button
        onClick={() => setIsEditing(true)}
        className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        <FaEdit />
        Edit
      </button>
    </div>
  );
};

export default ProfileHeader;
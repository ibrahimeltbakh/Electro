import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInput = ({ icon: Icon, placeholder, error, register, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Icon />
      </div>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        {...register(name)}
        className={`pl-10 pr-10 dark:text-black py-2 w-full rounded-lg shadow-sm border ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute dark:text-black right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
};

export default PasswordInput;
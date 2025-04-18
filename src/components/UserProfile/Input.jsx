import React from 'react';

const Input = ({ icon: Icon, type = 'text', placeholder, error, register, name }) => {
  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Icon />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`pl-10 pr-4 dark:text-black py-2 w-full rounded-lg shadow-sm border ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
};

export default Input;
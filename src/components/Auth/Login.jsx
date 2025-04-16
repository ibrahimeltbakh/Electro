import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from '@/api/auth/auth';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
  const { token, role } = data;
  localStorage.setItem('token', token);
  localStorage.setItem('role', role || 'user'); 
  toast.success('Login successful!');
  setTimeout(() => {
    window.location.href = role === 'admin' ? '/admin' : '/';
  }, 1500);
},

    onError: (error) => {
      toast.error(error.response?.data?.message || 'Login failed');
    },
  });

  const onSubmit = async (data) => {
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
        console.error(error);
    }
  };

  const formAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const inputAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-50 p-8">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={formAnimation}
          className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6"
        >
          <motion.div variants={inputAnimation} className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-blue-400">Welcome Back!</h2>
            <p className="text-gray-500">Sign in to continue your journey</p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div variants={inputAnimation} className="relative">
              <div className="absolute left-3 top-[1.1rem] text-sky-400 z-10">
                <FaEnvelope />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className={`w-full pl-10 pr-4 py-3 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300`}
                {...register('email', { 
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                })}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-500"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={inputAnimation} className="relative">
              <div className="absolute left-3 top-[1.1rem] text-sky-400 z-10">
                <FaLock />
              </div>
              <input
                type="password"
                placeholder="Password"
                className={`w-full pl-10 pr-4 py-3 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300`}
                {...register('password', { 
                  required: 'Password is required',
                  minLength: { value: 4, message: 'Password must be at least 4 characters' }
                })}
              />
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-500"
                >
                  {errors.password.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={inputAnimation} className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-600">
                <input type="checkbox" className="rounded text-sky-500 focus:ring-sky-500" />
                <span>Remember me</span>
              </label>
             
            </motion.div>

            <motion.button
              variants={inputAnimation}
              type="submit"
              disabled={mutation.isLoading}
              className={`w-full py-3 cursor-pointer px-4 flex items-center justify-center space-x-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-md shadow-lg 
                ${mutation.isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:from-sky-600 hover:to-blue-700'} 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-300`}
            >
              {mutation.isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </div>
              ) : (
                <>
                  <FaSignInAlt className="text-xl" />
                  <span>Sign In</span>
                </>
              )}
            </motion.button>
          </form>

          <motion.div 
            variants={inputAnimation}
            className="relative flex items-center justify-center"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
          
          </motion.div>

        

          <motion.p 
            variants={inputAnimation}
            className="text-center text-sm text-gray-600"
          >
            Don't have an account?{' '}
            <a href="/register" className="text-sky-600 hover:underline transition-all duration-300">
              Create one now
            </a>
          </motion.p>

          
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")'
        }}
      />
    </div>
  );
};

export default Login; 
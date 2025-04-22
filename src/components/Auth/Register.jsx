import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '@/api/auth/auth';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const password = watch('password');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success('Registration successful!');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      toast.error(errorMessage);
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

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const renderPasswordInput = (field) => (
    <motion.div
      key={field.name}
      variants={inputAnimation}
      className="relative"
    >
      <div className="absolute left-3 top-3 text-sky-400 z-10">
        <field.icon />
      </div>
      <input
        type={field.name === 'password' ? (showPassword ? 'text' : 'password') : (showConfirmPassword ? 'text' : 'password')}
        placeholder={field.placeholder}
        className={`w-full pl-10 pr-10 py-2 dark:text-black border ${errors[field.name] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300`}
        {...register(field.name, {
          required: `${field.placeholder} is required`,
          ...(field.name === 'password' && {
            minLength: { value: 4, message: 'Password must be at least 4 characters' },
            pattern: {
              value: /^[A-Za-z\d]{4,}$/,
              message: 'Password must include letters and numbers'
            }
          }),
          ...(field.name === 'confirmPassword' && {
            validate: (value) => value === password || 'Passwords do not match'
          })
        })}
      />
      <div 
        className="absolute right-3 top-3 text-gray-500 cursor-pointer z-10 hover:text-sky-500 transition-colors duration-200"
        onClick={field.name === 'password' ? togglePasswordVisibility : toggleConfirmPasswordVisibility}
      >
        {field.name === 'password' ? (showPassword ? <FaEyeSlash /> : <FaEye />) : (showConfirmPassword ? <FaEyeSlash /> : <FaEye />)}
      </div>
      {errors[field.name] && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-500"
        >
          {errors[field.name].message}
        </motion.p>
      )}
    </motion.div>
  );

  const renderRegularInput = (field) => (
    <motion.div
      key={field.name}
      variants={inputAnimation}
      className="relative"
    >
      <div className="absolute left-3 top-3 text-sky-400 z-10">
        <field.icon />
      </div>
      {field.type === 'textarea' ? (
        <textarea
          placeholder={field.placeholder}
          className={`w-full pl-10 dark:text-black pr-4 py-2 border ${errors[field.name] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300`}
          {...register(field.name, {
            required: `${field.placeholder} is required`,
            ...(field.name === 'address' && {
              minLength: { value: 5, message: 'Address must be at least 5 characters' }
            })
          })}
        />
      ) : (
        <input
          type={field.type}
          placeholder={field.placeholder}
          className={`w-full pl-10 pr-4 py-2 dark:text-black border ${errors[field.name] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300`}
          {...register(field.name, {
            required: `${field.placeholder} is required`,
            ...(field.name === 'email' && {
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
            }),
            ...(field.name === 'phone' && {
              pattern: {
                value: /^(\+?[0-9]{1,3})?[0-9]{10,15}$/,
                message: 'Phone number must be 10-15 digits'
              }
            })
          })}
        />
      )}
      {errors[field.name] && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-500"
        >
          {errors[field.name].message}
        </motion.p>
      )}
    </motion.div>
  );

  const fields = [
    { icon: FaUser, name: 'name', type: 'text', placeholder: 'Full Name' },
    { icon: FaEnvelope, name: 'email', type: 'email', placeholder: 'Email Address' },
    { icon: FaPhone, name: 'phone', type: 'text', placeholder: 'Phone Number' },
    { icon: FaMapMarkerAlt, name: 'address', type: 'textarea', placeholder: 'Address' },
    { icon: FaLock, name: 'password', type: 'password', placeholder: 'Password' },
    { icon: FaLock, name: 'confirmPassword', type: 'password', placeholder: 'Confirm Password' }
  ];

  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-50 p-8">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={formAnimation}
          className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6"
        >
          <motion.h2 
            variants={inputAnimation}
            className="text-3xl font-extrabold text-center text-blue-400"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Create an Account
          </motion.h2>
          <motion.h3 
            variants={inputAnimation}
            className="text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Join the Electro Revolution!
          </motion.h3>
          <motion.div 
            variants={inputAnimation}
            className="py-3 px-4 bg-blue-50 rounded-lg border border-blue-100"
          >
            <div className='text-center'>
              <h5 className='text-center text-red-600 font-semibold'>
                🔥 <span className='inline-block animate-bounce'>LIMITED TIME OFFER</span> 🔥
              </h5>
              <p className='text-center text-gray-600 animate-pulse font-medium'>
                Sign up now and get 90% OFF your first order!!
              </p>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field) => 
              field.type === 'password' ? renderPasswordInput(field) : renderRegularInput(field)
            )}

            <motion.button
              variants={inputAnimation}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={mutation.isLoading}
              className={`w-full cursor-pointer py-3 px-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-md shadow-lg 
                ${mutation.isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:from-sky-600 hover:to-blue-700'} 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-300`}
            >
              {mutation.isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Registering...
                </div>
              ) : (
                'Create Account'
              )}
            </motion.button>
          </form>

          <div className="relative flex items-center justify-center">
            <div className="h-px bg-gray-300 w-full"></div>
            <span className="relative px-4 bg-white text-sm text-gray-500">or register with</span>
            <div className="h-px bg-gray-300 w-full"></div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <motion.button
              whileHover={{ y: -2, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
              className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              <svg className="h-5 w-5 mx-auto" fill="#3B5998" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ y: -2, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
              className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              <svg className="h-5 w-5 mx-auto" fill="#1DA1F2" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ y: -2, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
              className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              <svg className="h-5 w-5 mx-auto" fill="#DB4437" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C8.095 2 4.463 5.52 4.463 9.936s3.632 7.936 8.082 7.936c7.305 0 9.043-6.835 8.337-7.696l-8.337-.029z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>

          <motion.p 
            variants={inputAnimation}
            className="mt-4 text-center text-sm text-gray-600"
          >
            Already have an account?{' '}
            <a href="/login" className="text-sky-600 hover:underline transition-all duration-300 font-medium">
              Login here
            </a>
          </motion.p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden md:block w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1594028879160-a5702f8c0b5b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-sky-800/40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl font-bold mb-4 text-shadow"
          >
            Join Electro Today
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl mb-6 text-center text-shadow max-w-lg"
          >
            Create an account to enjoy exclusive member benefits and personalized shopping experience.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="grid grid-cols-2 gap-4 w-full max-w-md"
          >
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow-lg">
              <div className="font-bold text-xl mb-1">Member Discounts</div>
              <div className="text-sm">Exclusive deals just for you</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow-lg">
              <div className="font-bold text-xl mb-1">Fast Checkout</div>
              <div className="text-sm">Save your details for next time</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow-lg">
              <div className="font-bold text-xl mb-1">Order History</div>
              <div className="text-sm">Track all your purchases</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow-lg">
              <div className="font-bold text-xl mb-1">Wishlist</div>
              <div className="text-sm">Save items for later</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register; 
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '@/api/auth/auth';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const password = watch('password');

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
          >
            Create an Account
          </motion.h2>
          <motion.h3 
            variants={inputAnimation}
            className="text-center text-gray-500"
          >
            Join the Electro Revolution!
          </motion.h3>
          <motion.div variants={inputAnimation}>
            <h5 className='text-center text-red-600'>
              🔥 <span className='inline-block animate-bounce'>LIMITED TIME OFFER</span> 🔥
            </h5>
            <p className='text-center text-gray-600 animate-pulse'>
              Sign up now and get 90% OFF your first order!!
            </p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {[
              { icon: FaUser, name: 'name', type: 'text', placeholder: 'Full Name' },
              { icon: FaEnvelope, name: 'email', type: 'email', placeholder: 'Email Address' },
              { icon: FaPhone, name: 'phone', type: 'text', placeholder: 'Phone Number' },
              { icon: FaMapMarkerAlt, name: 'address', type: 'textarea', placeholder: 'Address' },
              { icon: FaLock, name: 'password', type: 'password', placeholder: 'Password' },
              { icon: FaLock, name: 'confirmPassword', type: 'password', placeholder: 'Confirm Password' }
            ].map((field) => (
              <motion.div
                key={field.name}
                variants={inputAnimation}
                className="relative"
              >
                <div className="absolute  left-3 top-3 text-sky-400 z-10">
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
                      }),
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
            ))}

            <motion.button
              variants={inputAnimation}
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
                'Register'
              )}
            </motion.button>
          </form>

          <motion.p 
            variants={inputAnimation}
            className="mt-4 text-center text-sm text-gray-600"
          >
            Already have an account?{' '}
            <a href="/login" className="text-sky-600 hover:underline transition-all duration-300">
              Login here
            </a>
          </motion.p>

         
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1594028879160-a5702f8c0b5b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}
      ></motion.div>
    </div>
  );
};

export default Register; 
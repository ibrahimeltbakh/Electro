import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser, getUserProfile } from '@/api/auth/auth';
import { FaEnvelope, FaLock, FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext/AuthContext';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      const { token, role } = data;
      try {
        const profile = await getUserProfile(token);
        console.log('Profile response after login:', profile);

        const userData = {
          name: profile.user?.name || profile.name || '',
          email: profile.user?.email || profile.email || '',
          phone: profile.user?.phone || profile.phone || '',
          address: profile.user?.address || profile.address || '',
          imageUrl: profile.user?.imageUrl || profile.imageUrl || profile.image || profile.profileImage || '',
          role: role || 'user',
        };

        console.log('User data stored in AuthContext:', userData);
        login(token, role, userData);

        toast.success(`Welcome back, ${userData.name}! `, {
          duration: 4000,
          style: {
            background: '#4CAF50',
            color: '#fff',
            fontSize: '16px',
            padding: '16px',
          },
        });

        setTimeout(() => {
          navigate(role === 'admin' ? '/admin' : '/');
        }, 1500);
      } catch (error) {
        console.error('Error details:', error);
        toast.error('Failed to fetch user profile: ' + (error.response?.data?.message || error.message));
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Login failed');
    },
  });

  const onSubmit = async (data) => {
    await mutation.mutateAsync(data);
  };

  const formAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const inputAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

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
            <motion.h2 
              className="text-3xl font-extrabold text-blue-400"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Welcome Back!
            </motion.h2>
            <motion.p 
              className="text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Sign in to continue your journey
            </motion.p>
          </motion.div>

          <motion.div
            variants={inputAnimation}
            className="py-3 px-4 bg-blue-50 rounded-lg border border-blue-100"
          >
            <p className="text-sm text-blue-600 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
              </svg>
              Exclusive deals await inside! Sign in to see personalized offers.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div variants={inputAnimation} className="relative">
              <div className="absolute left-3 top-[1.1rem] text-sky-400 z-10">
                <FaEnvelope />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className={`w-full dark:text-black pl-10 pr-4 py-3 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
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
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full pl-10 dark:text-black pr-10 py-3 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 4, message: 'Password must be at least 4 characters' },
                })}
              />
              <div 
                className="absolute right-3 top-[1.1rem] text-gray-500 cursor-pointer z-10 hover:text-sky-500 transition-colors duration-200"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
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
              <label className="flex items-center space-x-2 text-gray-600 hover:text-sky-500 transition-colors cursor-pointer">
                <input type="checkbox" className="rounded text-sky-500 focus:ring-sky-500" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-sky-600 hover:text-sky-800 hover:underline transition-all duration-300">
                Forgot password?
              </a>
            </motion.div>

            <motion.button
              variants={inputAnimation}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={mutation.isLoading}
              className={`w-full py-3 px-4 flex items-center justify-center space-x-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-md shadow-lg ${
                mutation.isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:from-sky-600 hover:to-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-300`}
            >
              {mutation.isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
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

          <motion.p variants={inputAnimation} className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-sky-600 hover:underline transition-all duration-300 font-medium">
              Create one now
            </a>
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden md:block w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-sky-800/40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl font-bold mb-4 text-shadow"
          >
            Electro Revolution
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl mb-6 text-center text-shadow max-w-lg"
          >
            Discover cutting-edge technology and exclusive deals on the latest electronics.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex space-x-4"
          >
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow-lg">
              <div className="font-bold text-2xl mb-1">24/7</div>
              <div className="text-sm">Customer Support</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow-lg">
              <div className="font-bold text-2xl mb-1">100%</div>
              <div className="text-sm">Secure Payment</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow-lg">
              <div className="font-bold text-2xl mb-1">Fast</div>
              <div className="text-sm">Delivery</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
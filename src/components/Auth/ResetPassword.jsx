import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { resetPassword } from '@/api/auth/auth';

const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success('Password reset successful!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Reset failed');
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <div>
        <label className="block mb-1">Email</label>
        <input
          className="w-full p-2 mb-2 border rounded"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block mb-1">New Password</label>
        <input
          type="password"
          className="w-full p-2 mb-2 border rounded"
          {...register('newPassword', { required: 'New password is required' })}
        />
        {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
      </div>
      <button
        type="button"
        onClick={handleSubmit(onSubmit)}
        disabled={mutation.isLoading}
        className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        {mutation.isLoading ? 'Resetting...' : 'Reset Password'}
      </button>
    </div>
  );
};

export default ResetPassword;
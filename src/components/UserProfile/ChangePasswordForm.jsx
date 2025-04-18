import React from 'react';
import { FaLock } from 'react-icons/fa';
import PasswordInput from './PasswordInput';

const ChangePasswordForm = ({ handleSubmitPassword, onSubmitPassword, registerPassword, passwordErrors, passwordMutation }) => {
  return (
    <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-4 max-w-md">
      <PasswordInput
        icon={FaLock}
        placeholder="Current Password"
        error={passwordErrors.currentPassword}
        name="currentPassword"
        register={registerPassword}
      />
      <PasswordInput
        icon={FaLock}
        placeholder="New Password"
        error={passwordErrors.newPassword}
        name="newPassword"
        register={registerPassword}
      />
      <button
        type="submit"
        disabled={passwordMutation.isLoading}
        className="w-full px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {passwordMutation.isLoading ? 'Changing...' : 'Change Password'}
      </button>
    </form>
  );
};

export default ChangePasswordForm;
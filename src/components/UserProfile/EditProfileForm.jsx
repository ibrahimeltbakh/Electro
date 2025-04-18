import React from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Input from './Input';

const EditProfileForm = ({ handleSubmitUpdate, onSubmitUpdate, registerUpdate, updateErrors, updateMutation, resetUpdate, user, setIsEditing }) => {
  return (
    <form onSubmit={handleSubmitUpdate(onSubmitUpdate)} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <Input icon={FaUser} placeholder="Full Name" error={updateErrors.name} name="name" register={registerUpdate} />
      <Input icon={FaEnvelope} placeholder="Email Address" error={updateErrors.email} name="email" register={registerUpdate} />
      <Input icon={FaPhone} placeholder="Phone Number" error={updateErrors.phone} name="phone" register={registerUpdate} />
      <Input icon={FaMapMarkerAlt} placeholder="Address" error={updateErrors.address} name="address" register={registerUpdate} />

      <div className="col-span-2 flex gap-4 mt-4">
        <button
          type="submit"
          disabled={updateMutation.isLoading}
          className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {updateMutation.isLoading ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={() => {
            setIsEditing(false);
            resetUpdate(user);
          }}
          className="px-6 py-2 cursor-pointer bg-red-800 text-white rounded-lg hover:bg-red-600 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
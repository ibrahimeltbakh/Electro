import React, { useContext, useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext/AuthContext";
import {
  changePassword,
  updateUser,
  uploadProfileImage,
  getUserProfile,
} from "@/api/auth/auth";

import ProfileHeader from "@/components/UserProfile/ProfileHeader";
import EditProfileForm from "@/components/UserProfile/EditProfileForm";
import ChangePasswordForm from "@/components/UserProfile/ChangePasswordForm";

const UserAccount = () => {
  const { user, token, login, refreshUser } = useContext(AuthContext);

  const fileInputRef = useRef(null);

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm();

  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    formState: { errors: updateErrors },
    reset: resetUpdate,
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.imageUrl || null);

  useEffect(() => {
    setProfileImage(user?.imageUrl || null);
    resetUpdate({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    });
  }, [user, resetUpdate]);

  const passwordMutation = useMutation({
    mutationFn: (data) => changePassword(token, data),
    onSuccess: () => {
      toast.success("Password changed successfully!");
      resetPassword();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to change password");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data) => updateUser(token, data),
    onSuccess: async (data) => {
      const updatedUser = {
        ...user,
        name: data.name || user.name,
        email: data.email || user.email,
        phone: data.phone || user.phone,
        address: data.address || user.address,
      };
      login(token, user.role, updatedUser);
      // Refresh user data from the API to reflect the change on the ui without needing to logout and login again
      await refreshUser(token);
      toast.success("Account updated successfully!");
      setIsEditing(false);
      resetUpdate(updatedUser);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update account");
    },
  });

  const imageMutation = useMutation({
    mutationFn: (imageFile) => uploadProfileImage(token, imageFile),
    onSuccess: async () => {
      try {
        const updatedProfile = await getUserProfile(token);
        const imageUrl =
          updatedProfile.imageUrl ||
          updatedProfile.image ||
          updatedProfile.profileImage;
        if (imageUrl) {
          const updatedUser = { ...user, imageUrl };
          login(token, user.role, updatedUser);
          toast.success("Profile image uploaded successfully!");
        } else {
          toast.error("Image uploaded, but no image URL found in user profile");
        }
      } catch {
        toast.error("Failed to fetch updated profile after image upload");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to upload image");
    },
  });

  const onSubmitPassword = async (data) => {
    await passwordMutation.mutateAsync(data);
  };

  const onSubmitUpdate = async (data) => {
    await updateMutation.mutateAsync(data);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      imageMutation.mutate(file);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <ProfileHeader
          user={user}
          profileImage={profileImage}
          fileInputRef={fileInputRef}
          handleImageUpload={handleImageUpload}
          setIsEditing={setIsEditing}
        />
        {isEditing && (
          <EditProfileForm
            handleSubmitUpdate={handleSubmitUpdate}
            onSubmitUpdate={onSubmitUpdate}
            registerUpdate={registerUpdate}
            updateErrors={updateErrors}
            updateMutation={updateMutation}
            resetUpdate={resetUpdate}
            user={user}
            setIsEditing={setIsEditing}
          />
        )}
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Change Password
        </h2>
        <ChangePasswordForm
          handleSubmitPassword={handleSubmitPassword}
          onSubmitPassword={onSubmitPassword}
          registerPassword={registerPassword}
          passwordErrors={passwordErrors}
          passwordMutation={passwordMutation}
        />
      </div>
    </>
  );
};

export default UserAccount;

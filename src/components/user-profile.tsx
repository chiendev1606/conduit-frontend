import { useState } from 'react';
import { Button } from './button';
import { FormInput } from './form';
import { FormTextarea } from './form/form-textarea';
import { Container } from './layout/container';

interface UserProfileProps {
  initialUserData?: UserData;
  onSave?: (userData: UserData) => void;
  onDelete?: () => void;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  phoneNumber: string;
  address: string;
  state: string;
  zipCode: string;
  country: string;
  language: string;
  timezone: string;
  currency: string;
  profilePhoto?: string;
}

export const UserProfile = ({ initialUserData, onSave, onDelete }: UserProfileProps) => {
  const [userData, setUserData] = useState<UserData>(
    initialUserData || {
      firstName: '',
      lastName: '',
      email: '',
      organization: '',
      phoneNumber: '',
      address: '',
      state: '',
      zipCode: '',
      country: '',
      language: '',
      timezone: '',
      currency: '',
      profilePhoto: '',
    },
  );

  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    onSave?.(userData);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmed) {
      onDelete?.();
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({
          ...prev,
          profilePhoto: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoReset = () => {
    setUserData((prev) => ({
      ...prev,
      profilePhoto: '',
    }));
  };

  return (
    <Container>
      <h1 className="mb-6 text-2xl font-semibold text-gray-700">Account Settings</h1>

      {/* Profile Details */}
      <div className="mb-6 pb-6">
        <h2 className="mb-4 text-lg font-medium text-gray-700">Profile Details</h2>

        {/* Profile Photo */}
        <div className="mb-6 flex items-start">
          <div className="relative">
            <div className="mr-4 h-24 w-24 overflow-hidden rounded-md bg-gray-100">
              {userData.profilePhoto ? (
                <img
                  src={userData.profilePhoto}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-blue-50">
                  <span className="text-3xl text-gray-400">👤</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-2 flex space-x-2">
              <label className="relative cursor-pointer">
                <span className="block rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700">
                  Upload new photo
                </span>
                <input
                  type="file"
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={handlePhotoUpload}
                />
              </label>
              <button
                className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
                onClick={handlePhotoReset}
              >
                Reset
              </button>
            </div>
            <p className="text-xs text-gray-500">Allowed JPG, GIF or PNG. Max size of 800K</p>
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* First Name */}
          <div>
            <FormInput
              label="First Name"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
            />
          </div>

          {/* Last Name */}
          <div>
            <FormInput
              label="Last Name"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
            />
          </div>

          {/* Email */}
          <div>
            <FormInput
              label="Email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Email */}
          <div>
            <FormInput
              label="New Password"
              name="newPassword"
              value={userData.newPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <FormTextarea
              label="Bio"
              name="bio"
              placeholder="short bio about yourself"
              value={userData.bio}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="mt-6 flex space-x-3">
          <Button
            variant="primary"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
          <Button variant="text">Cancel</Button>
        </div>
      </div>
    </Container>
  );
};

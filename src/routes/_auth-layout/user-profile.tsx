import { UserProfileContainer } from '@/components/user-profile-container';
import { createFileRoute } from '@tanstack/react-router';
import { toast } from 'sonner';

export const Route = createFileRoute('/_auth-layout/user-profile')({
  component: UserProfilePage,
});

function UserProfilePage() {
  const initialUserData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    organization: 'PIXINVENT',
    phoneNumber: '674 758 7365',
    address: '123 Main St',
    state: 'California',
    zipCode: '34753',
    country: 'USA',
    language: 'English',
    timezone: 'GMT-8',
    currency: 'USD',
  };

  const handleSaveSuccess = () => {
    toast.success('Profile updated successfully');
  };

  const handleDeleteSuccess = () => {
    toast.error('Account deleted');
    // In a real app, you would redirect to login or home page after deletion
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <UserProfileContainer
        initialUserData={initialUserData}
        onSaveSuccess={handleSaveSuccess}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </div>
  );
}

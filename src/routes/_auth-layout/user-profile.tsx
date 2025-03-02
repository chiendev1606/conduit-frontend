import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth-layout/user-profile')({
  component: UserProfile,
});

function UserProfile() {
  return <div>Hello "/_auth-layout/user-profile"!</div>;
}

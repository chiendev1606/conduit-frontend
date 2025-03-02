import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth-layout')({
  component: AuthLayout,
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({ to: '/sign-in' });
    }
  },
});

function AuthLayout() {
  return <Outlet />;
}

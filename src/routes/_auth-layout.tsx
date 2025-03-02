import { Header } from '@/components';
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
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main content area with top padding for the fixed header */}
      <main className="px-4 pt-20 pb-10">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

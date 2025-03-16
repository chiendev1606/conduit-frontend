import { Header } from '@/components/layout';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth-layout')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/sign-in' });
    }
  },
});

function RouteComponent() {
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

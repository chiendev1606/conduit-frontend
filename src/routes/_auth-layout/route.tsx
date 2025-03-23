import { Header } from '@/components/layout';
import { checkAuth } from '@/hooks/queries/use-profile-query';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth-layout')({
  component: RouteComponent,
  beforeLoad: async ({ context: { queryClient } }) => {
    const isAuth = await checkAuth(queryClient);
    if (!isAuth) {
      throw redirect({ to: '/sign-in' });
    }
  },
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Outlet />
    </div>
  );
}

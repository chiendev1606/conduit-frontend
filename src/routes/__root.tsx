import AllProviders from '@/providers/all-providers';
import { AuthContextType } from '@/types';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Toaster } from 'sonner';

export const Route = createRootRouteWithContext<AuthContextType>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <AllProviders>
      <Outlet />
      <Toaster
        position="top-center"
        toastOptions={{ duration: 2000 }}
      />
      <TanStackRouterDevtools position="bottom-right" />
    </AllProviders>
  );
}

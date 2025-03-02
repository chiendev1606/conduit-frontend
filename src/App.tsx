import { createRouter, RouterProvider } from '@tanstack/react-router';
import { getAuthToken } from './utils/auth-utils';
import { routeTree } from './routeTree.gen';
import { useAuth } from './hooks/useAuth';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    accessToken: getAuthToken(),
    user: null,
    setUser: () => {},
    isAuthenticated: getAuthToken() !== null,
    setIsAuthenticated: () => {},
  },
});

// Register things for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useAuth();

  return (
    <RouterProvider
      context={{ user, setUser, isAuthenticated, setIsAuthenticated }}
      router={router}
    />
  );
}

export default App;

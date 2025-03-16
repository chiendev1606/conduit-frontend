import { createRouter, RouterProvider } from '@tanstack/react-router';
import { useAuth } from './hooks/useAuth';
import { routeTree } from './routeTree.gen';
import { queryClient } from './providers';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    user: null,
    queryClient: queryClient,
  },
});

// Register things for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const { user } = useAuth();

  return (
    <RouterProvider
      context={{ user, queryClient }}
      router={router}
    />
  );
}

export default App;

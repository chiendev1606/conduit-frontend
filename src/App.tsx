import { createRouter, RouterProvider } from '@tanstack/react-router';
import { useState } from 'react';
import { queryClient } from './providers';
import { routeTree } from './routeTree.gen';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
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
  useState(() => {
    document.getElementById('loading-global')?.remove();
  });

  return (
    <RouterProvider
      context={{ queryClient }}
      router={router}
    />
  );
}

export default App;

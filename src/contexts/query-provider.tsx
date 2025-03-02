import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from '@tanstack/react-router';
import { useState } from 'react';

function ReactQueryProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default ReactQueryProvider;

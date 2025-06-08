'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  //TANSTACK QUERY CLIENT
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        //STALE TIME Is the time after which the data is considered stale and a new request is made to the server.
        staleTime: 60 * 1000, // 1 minute
        //REFETCH ON WINDOW FOCUS Is the time after which the data is considered stale and a new request is made to the server.
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
} 
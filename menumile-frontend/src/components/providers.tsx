'use client';

import React, { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient as defaultQueryClient } from '@/lib/query-client';

export default function Providers({ children }: { children: React.ReactNode }) {
  // Use state to avoid sharing the query client between different requests in SSR
  const [queryClient] = useState(() => defaultQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

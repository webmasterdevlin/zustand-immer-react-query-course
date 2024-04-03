import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { QueryClientConfig } from '@tanstack/react-query';
import type { ReactNode } from 'react';

export type QueryProviderWrapperProps = {
  children: ReactNode;
};

export const createQueryProviderWrapper = (config: QueryClientConfig = {}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    ...config,
  });

  const QueryComponent = ({ children }: QueryProviderWrapperProps) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };

  return QueryComponent;
};

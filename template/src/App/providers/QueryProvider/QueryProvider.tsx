import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { PropsWithChildren } from 'react';

type QueryProviderProps = {
  queryClient: QueryClient;
};

export const QueryProvider = ({ queryClient, children }: PropsWithChildren<QueryProviderProps>) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

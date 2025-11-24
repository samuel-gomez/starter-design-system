import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

type QueryProviderProps = {
  queryClient: QueryClient;
};

export const QueryProvider = ({ queryClient, children }: PropsWithChildren<QueryProviderProps>) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {typeof window !== 'undefined' && createPortal(<ReactQueryDevtools initialIsOpen={false} />, document.body)}
    </QueryClientProvider>
  );
};

import type { ComponentProps, PropsWithChildren } from 'react';
import { QueryProvider } from '../QueryProvider/QueryProvider';

type ProvidersProps = {
  queryClient: ComponentProps<typeof QueryProvider>['queryClient'];
};

export const Providers = ({ queryClient, children }: PropsWithChildren<ProvidersProps>) => {
  return <QueryProvider queryClient={queryClient}>{children}</QueryProvider>;
};

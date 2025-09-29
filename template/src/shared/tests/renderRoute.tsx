import { QueryClient } from '@tanstack/react-query';
import { render, type RenderOptions } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { createMemoryRouter, type MemoryRouterOpts, type RouteObject, RouterProvider } from 'react-router';
import { Providers } from '../../App/providers/Providers/Providers';

export type RenderRouteOptions = {
  routes: RouteObject[];
  routesOptions?: MemoryRouterOpts;
  renderOptions?: Omit<RenderOptions, 'queries'> | undefined;
  providerOptions?: Partial<ComponentProps<typeof Providers>>;
};

export const renderRoute = ({ routes, routesOptions, renderOptions, providerOptions }: RenderRouteOptions) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });
  const router = createMemoryRouter(routes, routesOptions);

  return render(
    <Providers queryClient={queryClient} {...providerOptions}>
      <RouterProvider router={router} />
    </Providers>,
    renderOptions,
  );
};

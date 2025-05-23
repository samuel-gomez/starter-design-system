import { QueryClient } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';
import { getDemoData200Empty } from '../../../../../mocks/handlers/demoHandlers';
import { server } from '../../../../../mocks/server';
import { Providers } from '../../../../App/providers/Providers/Providers';
import { demoRoutes } from '../../route';

describe('SubDemo Component', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });

  it('should display "Loading ..." when currentUser is not found', () => {
    server.use(getDemoData200Empty);

    const router = createMemoryRouter([demoRoutes], { initialEntries: ['/demo/1'] });

    render(
      <Providers queryClient={queryClient}>
        <RouterProvider router={router} />
      </Providers>,
    );

    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });
});

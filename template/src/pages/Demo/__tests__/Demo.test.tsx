import { QueryClient } from '@tanstack/react-query';
import { render, screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';
import demoFixtures from '../../../../mocks/fixtures/demoFixture.json';
import { getDemoData200 } from '../../../../mocks/handlers/demoHandlers';
import { server } from '../../../../mocks/server';
import { Providers } from '../../../App/providers/Providers/Providers';
import { Demo } from '../Demo';
import type { Users } from '../demo.type';
import { demoRoutes } from '../route';

describe('Demo', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });

  it('should render the title', () => {
    server.use(getDemoData200);

    render(
      <Providers queryClient={queryClient}>
        <MemoryRouter>
          <Demo />
        </MemoryRouter>
      </Providers>,
    );

    expect(screen.getByRole('heading', { name: 'Demo page' })).toBeInTheDocument();
  });

  it('should render loading', () => {
    server.use(getDemoData200);

    render(
      <Providers queryClient={queryClient}>
        <MemoryRouter>
          <Demo />
        </MemoryRouter>
      </Providers>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render data', async () => {
    server.use(getDemoData200);

    render(
      <Providers queryClient={queryClient}>
        <MemoryRouter>
          <Demo />
        </MemoryRouter>
      </Providers>,
    );

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

    const navItem = screen.getByRole('navigation');

    expect(within(navItem).getAllByRole('link')).toHaveLength(10);
  });

  it('should render a link to return to home', () => {
    server.use(getDemoData200);

    render(
      <Providers queryClient={queryClient}>
        <MemoryRouter>
          <Demo />
        </MemoryRouter>
      </Providers>,
    );

    expect(screen.getByRole('link', { name: 'Return to home' })).toBeInTheDocument();
  });

  it.each([...(demoFixtures as Users).map(({ name }) => [name])])(
    'should navigate to sub demo when clicking the link %s',
    async (name: string) => {
      server.use(getDemoData200);
      const user = userEvent.setup();
      const router = createMemoryRouter([demoRoutes], { initialEntries: ['/demo'] });

      render(
        <Providers queryClient={queryClient}>
          <RouterProvider router={router} />
        </Providers>,
      );

      await waitFor(async () => {
        const link = screen.getByRole('link', { name });
        await user.click(link);
      });

      expect(screen.getByRole('heading', { name: `SubDemo page ${name}` })).toBeInTheDocument();
    },
  );
});

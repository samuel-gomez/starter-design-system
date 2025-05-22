import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';
import { Demo } from '../Demo';
import { demoRoutes } from '../route';

describe('Demo', () => {
  it('should render the title', () => {
    render(
      <MemoryRouter>
        <Demo />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: 'Demo page' })).toBeInTheDocument();
  });

  it('should render navigation links to sub demos', () => {
    render(
      <MemoryRouter>
        <Demo />
      </MemoryRouter>,
    );
    expect(screen.getByRole('link', { name: 'To sub demo 1' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'To sub demo 2' })).toBeInTheDocument();
  });

  it('should render a link to return to home', () => {
    render(
      <MemoryRouter>
        <Demo />
      </MemoryRouter>,
    );
    expect(screen.getByRole('link', { name: 'Return to home' })).toBeInTheDocument();
  });

  it.each([['1'], ['2']])('should navigate to sub demo %s when clicking the link', async (page: string) => {
    const user = userEvent.setup();
    const router = createMemoryRouter([demoRoutes], { initialEntries: ['/demo'] });
    render(<RouterProvider router={router} />);
    const link = screen.getByRole('link', { name: `To sub demo ${page}` });
    await user.click(link);

    expect(screen.getByRole('heading', { name: `SubDemo page ${page}` })).toBeInTheDocument();
  });
});

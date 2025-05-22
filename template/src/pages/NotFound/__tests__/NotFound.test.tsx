import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { NotFound } from '../NotFound';

describe('NotFound', () => {
  it('should render the 404 title', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /Not Found/i })).toBeInTheDocument();
  });

  it('should render a link to the home page', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const link = screen.getByRole('link', { name: /Return to Home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('should add the root class to the parent of the title', () => {
    const { container, unmount } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(container).toHaveClass('root');

    unmount();

    expect(container).not.toHaveClass('root');
  });
});

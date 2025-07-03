import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { Layout } from '../Layout';

describe('Layout', () => {
  it('should display the header navigation, main and footer', () => {
    render(
      <MemoryRouter>
        <Layout>
          <p>Contenu test</p>
        </Layout>
      </MemoryRouter>,
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Demo' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Form Demo' })).toBeInTheDocument();

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText('Contenu test')).toBeInTheDocument();

    expect(screen.getByRole('contentinfo')).toHaveTextContent('Footer');
  });

  it('should add the root class to the parent of <main>', () => {
    const { container } = render(
      <MemoryRouter>
        <Layout>
          <p>Contenu test</p>
        </Layout>
      </MemoryRouter>,
    );

    expect(container).toHaveClass('root');
  });

  it('should remove the root class on unmount', () => {
    const { container, unmount } = render(
      <MemoryRouter>
        <Layout>
          <p>Contenu test</p>
        </Layout>
      </MemoryRouter>,
    );
    unmount();
    expect(container).not.toHaveClass('root');
  });
});

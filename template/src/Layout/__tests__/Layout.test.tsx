import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Layout } from '../Layout';

describe('Layout', () => {
  it('should display the header, main and footer', () => {
    render(
      <Layout>
        <p>Contenu test</p>
      </Layout>,
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
    expect(screen.getByText('Contenu test')).toBeInTheDocument();
  });

  it('should add the root class to the parent of <main>', () => {
    const { container } = render(
      <Layout>
        <p>Contenu test</p>
      </Layout>,
    );

    expect(container).toHaveClass('root');
  });

  it('should remove the root class on unmount', () => {
    const { container, unmount } = render(
      <Layout>
        <p>Contenu test</p>
      </Layout>,
    );
    unmount();
    expect(container).not.toHaveClass('root');
  });
});

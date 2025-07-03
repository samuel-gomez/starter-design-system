import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { appRoutes } from '../../../App/Routing/appRoutes';
import { renderRoute, type RenderRouteOptions } from '../../../shared/tests/renderRoute';
import { notFoundRoutes } from '../route';

describe('NotFound', () => {
  const renderRouteOptions: RenderRouteOptions = {
    routes: [notFoundRoutes],
    routesOptions: { initialEntries: [appRoutes.notFound()] },
  };

  it('should render the 404 title', () => {
    renderRoute(renderRouteOptions);

    expect(screen.getByRole('heading', { name: /Not Found/i })).toBeInTheDocument();
  });

  it('should render a link to the home page', () => {
    renderRoute(renderRouteOptions);

    const link = screen.getByRole('link', { name: /Return to Home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('should add the root class to the parent of the title', () => {
    const { container, unmount } = renderRoute(renderRouteOptions);

    expect(container).toHaveClass('root');

    unmount();

    expect(container).not.toHaveClass('root');
  });
});

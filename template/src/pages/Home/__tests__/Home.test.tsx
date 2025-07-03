import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { appRoutes } from '../../../App/Routing/appRoutes';
import { renderRoute, type RenderRouteOptions } from '../../../shared/tests/renderRoute';
import { homeRoutes } from '../route';

describe('Demo', () => {
  const renderRouteOptions: RenderRouteOptions = {
    routes: [homeRoutes],
    routesOptions: { initialEntries: [appRoutes.home()] },
  };

  it('should render the title', () => {
    renderRoute(renderRouteOptions);

    expect(screen.getByRole('heading', { name: 'Home page' })).toBeInTheDocument();
  });
});

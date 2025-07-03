import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { getDemoData200Empty } from '../../../../../mocks/handlers/demoHandlers';
import { server } from '../../../../../mocks/server';
import { appRoutes } from '../../../../App/Routing/appRoutes';
import { renderRoute, type RenderRouteOptions } from '../../../../shared/tests/renderRoute';
import { demoRoutes } from '../../route';

describe('SubDemo Component', () => {
  const renderRouteOptions: RenderRouteOptions = {
    routes: [demoRoutes],
    routesOptions: { initialEntries: [appRoutes.subDemo({ id: '1' })] },
  };

  it('should display "Loading ..." when currentUser is not found', () => {
    server.use(getDemoData200Empty);

    renderRoute(renderRouteOptions);

    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });
});

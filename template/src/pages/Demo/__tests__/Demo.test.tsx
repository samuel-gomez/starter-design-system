import { screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import demoFixtures from '../../../../mocks/fixtures/demoFixture.json';
import { getDemoData200 } from '../../../../mocks/handlers/demoHandlers';
import { server } from '../../../../mocks/server';
import { appRoutes } from '../../../App/Routing/appRoutes';
import { renderRoute, type RenderRouteOptions } from '../../../shared/tests/renderRoute';

import type { Users } from '../demo.type';
import { demoRoutes } from '../route';

describe('Demo', () => {
  const renderRouteOptions: RenderRouteOptions = {
    routes: [demoRoutes],
    routesOptions: { initialEntries: [appRoutes.demo()] },
  };

  beforeEach(() => {
    server.use(getDemoData200);
  });

  it('should render the title', () => {
    renderRoute(renderRouteOptions);

    expect(screen.getByRole('heading', { name: 'Demo page' })).toBeInTheDocument();
  });

  it('should render loading', () => {
    renderRoute(renderRouteOptions);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render data', async () => {
    renderRoute(renderRouteOptions);

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

    const navItem = screen.getByRole('navigation');

    expect(within(navItem).getAllByRole('link')).toHaveLength(10);
  });

  it('should render a link to return to home', () => {
    renderRoute(renderRouteOptions);

    expect(screen.getByRole('link', { name: 'Return to home' })).toBeInTheDocument();
  });

  it.each([...(demoFixtures as Users).map(({ name }) => [name])])(
    'should navigate to sub demo when clicking the link %s',
    async (name: string) => {
      const user = userEvent.setup();

      renderRoute(renderRouteOptions);

      await waitFor(async () => {
        const link = screen.getByRole('link', { name });
        await user.click(link);
      });

      expect(screen.getByRole('heading', { name: `SubDemo page ${name}` })).toBeInTheDocument();
    },
  );
});

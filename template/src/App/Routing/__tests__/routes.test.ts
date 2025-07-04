import { describe, expect, it } from 'vitest';
import { renderRoute } from '../../../shared/tests/renderRoute';
import { routesObject } from '../routes';

describe('routes', () => {
  it('renders home page on /', () => {
    renderRoute({
      routes: routesObject,
    });

    expect(window.location.pathname).toStrictEqual('/');
  });
});

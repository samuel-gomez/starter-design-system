import type { RouteObject } from 'react-router';
import { NotFound } from './NotFound';

export const notFoundRoutes: RouteObject = {
  path: 'not-found',
  element: <NotFound />,
};

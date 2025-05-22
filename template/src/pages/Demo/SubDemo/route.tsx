import type { RouteObject } from 'react-router';
import { SubDemo } from './SubDemo';

export const subDemoRoutes: RouteObject = {
  path: ':id',
  element: <SubDemo />,
};

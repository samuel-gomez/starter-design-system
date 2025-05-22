import type { RouteObject } from 'react-router';
import { Demo } from './Demo';
import { subDemoRoutes } from './SubDemo/route';

export const demoRoutes: RouteObject = {
  path: 'demo',
  element: <Demo />,
  children: [subDemoRoutes],
};

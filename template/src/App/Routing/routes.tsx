import { Navigate, Outlet, type RouteObject } from 'react-router';
import { formDemoRoutes } from 'src/pages/FormDemo/route';
import { Layout } from '../../Layout/Layout';
import { demoRoutes } from '../../pages/Demo/route';
import { homeRoutes } from '../../pages/Home/route';
import { notFoundRoutes } from '../../pages/NotFound/route';
import { appRoutes } from './appRoutes';

const rootRoutes: RouteObject = {
  path: '/',
  element: (
    <Layout>
      <Outlet />
    </Layout>
  ),
  children: [homeRoutes, demoRoutes, formDemoRoutes],
};

const fallbackRoute: RouteObject = {
  path: '*',
  element: <Navigate to={appRoutes.notFound()} replace />,
};

export const routesObject: RouteObject[] = [rootRoutes, notFoundRoutes, fallbackRoute];

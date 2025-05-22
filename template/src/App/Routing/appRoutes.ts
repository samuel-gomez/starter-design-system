export const appRoutes = {
  home: () => '/',
  demo: () => '/demo',
  subDemo: ({ id }: { id: string }) => `/demo/${id}`,
  notFound: () => '/not-found',
};

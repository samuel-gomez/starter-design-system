export const appRoutes = {
  home: () => '/',
  demo: () => '/demo',
  formDemo: () => '/form-demo',
  subDemo: ({ id }: { id: string }) => `/demo/${id}`,
  notFound: () => '/not-found',
};

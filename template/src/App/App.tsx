import { Providers } from './providers/Providers/Providers';
import { queryClient } from './providers/QueryProvider/queryClient';
import { BrowserRouter } from './Routing/BrowserRouter';
import '../assets/css';

export const App = () => {
  return (
    <Providers queryClient={queryClient}>
      <BrowserRouter />
    </Providers>
  );
};

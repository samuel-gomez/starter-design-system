import { Link } from 'react-router';
import { appRoutes } from '../../App/Routing/appRoutes';

export const Home = () => {
  return (
    <>
      <h1>Home page</h1>
      <Link to={appRoutes.demo()}>To demo</Link>
    </>
  );
};

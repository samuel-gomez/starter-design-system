import { NavLink, Outlet } from 'react-router';
import { appRoutes } from '../../App/Routing/appRoutes';
import { useDemoApi } from './hook/useDemoApi';

export const Demo = () => {
  const { result, isLoading } = useDemoApi();

  return (
    <>
      <h1>Demo page</h1>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <nav aria-label="Users navigation">
          <ul>
            {result.map(user => (
              <li key={user.id}>
                <NavLink to={appRoutes.subDemo({ id: user.id.toString() })}>{user.name}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <article>
        <Outlet context={{ users: result }} />
      </article>
    </>
  );
};

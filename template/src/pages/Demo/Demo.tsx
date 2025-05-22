import { Link, NavLink, Outlet } from 'react-router';
import { appRoutes } from '../../App/Routing/appRoutes';

export const Demo = () => {
  const context = "Hey there! I'm the context, just hanging out on the demo page nothing too fancy.";

  return (
    <>
      <h1>Demo page</h1>
      <nav>
        <ul>
          <li>
            <NavLink to={appRoutes.subDemo({ id: '1' })}>To sub demo 1</NavLink>
          </li>
          <li>
            <NavLink to={appRoutes.subDemo({ id: '2' })}>To sub demo 2</NavLink>
          </li>
        </ul>
      </nav>
      <article>
        <Outlet context={context} />
      </article>
      <Link to={appRoutes.home()}>Return to home</Link>
    </>
  );
};

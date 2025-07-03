import { type PropsWithChildren, useLayoutEffect, useRef } from 'react';
import { NavLink } from 'react-router';

import { appRoutes } from '../App/Routing/appRoutes';
import defaultClasses from './Layout.module.css';

export const Layout = ({ children }: PropsWithChildren) => {
  const mainRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const mainEl = mainRef.current;

    mainEl?.parentElement?.classList.add(defaultClasses.root);

    return () => {
      mainEl?.parentElement?.classList.remove(defaultClasses.root);
    };
  }, []);

  return (
    <>
      <header className={defaultClasses.header} role="banner">
        <nav aria-label="Main navigation">
          <ul>
            <li>
              <NavLink to={appRoutes.home()}>Home</NavLink>
            </li>
            <li>
              <NavLink to={appRoutes.demo()}>Demo</NavLink>
            </li>
            <li>
              <NavLink to={appRoutes.formDemo()}>Form Demo</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className={defaultClasses.main} ref={mainRef} role="main">
        {children}
      </main>
      <footer className={defaultClasses.footer} role="contentinfo">
        Footer
      </footer>
    </>
  );
};

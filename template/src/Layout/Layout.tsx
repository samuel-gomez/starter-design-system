import { type PropsWithChildren, useLayoutEffect, useRef } from 'react';

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
      <header className={defaultClasses.header}>Header</header>
      <main className={defaultClasses.main} ref={mainRef}>
        {children}
      </main>
      <footer className={defaultClasses.footer}>Footer</footer>
    </>
  );
};

import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router';
import { appRoutes } from '../../App/Routing/appRoutes';

import defaultClasses from './NotFound.module.css';

export const NotFound = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  useLayoutEffect(() => {
    const titleEl = titleRef.current;

    titleEl?.parentElement?.classList.add(defaultClasses.root);

    return () => {
      titleEl?.parentElement?.classList.remove(defaultClasses.root);
    };
  }, []);

  return (
    <>
      <h1 ref={titleRef}>404 - Not Found</h1>
      <p>Oops, this page got lost in the React starter.</p>
      <p>Maybe it took a wrong turn at the first component!</p>
      <p>Try heading back to the home page and start fresh.</p>
      <Link to={appRoutes.home()}>Return to Home</Link>
    </>
  );
};

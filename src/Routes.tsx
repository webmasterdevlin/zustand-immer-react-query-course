import React, { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router';
import type { ElementType } from 'react';
import type { RouteObject } from 'react-router';

const Loadable = (Component: ElementType) => {
  const LazyComponents = (props: any) => {
    return (
      <Suspense fallback={<h1>Loading</h1>}>
        <Component {...props} />
      </Suspense>
    );
  };

  return LazyComponents;
};

const HomePage = Loadable(
  lazy(() => {
    return import('./pages/HomePage');
  }),
);
const HeroesPage = Loadable(
  lazy(() => {
    return import('./pages/HeroesPage');
  }),
);
const AntiHeroesPage = Loadable(
  lazy(() => {
    return import('./pages/AntiHeroesPage');
  }),
);
const VillainsPage = Loadable(
  lazy(() => {
    return import('./pages/VillainsPage');
  }),
);

const TablePage = Loadable(
  lazy(() => {
    return import('./pages/TablePage');
  }),
);

export const pathNames = {
  antiHeroes: '/anti-heroes',
  heroes: '/heroes',
  home: '/',
  table: '/table',
  villains: '/villains',
} as const;

const lazyRoutes: RouteObject[] = [
  {
    element: <HomePage />,
    path: pathNames.home,
  },
  {
    element: <HeroesPage />,
    path: pathNames.heroes,
  },
  {
    element: <AntiHeroesPage />,
    path: pathNames.antiHeroes,
  },
  {
    element: <VillainsPage />,
    path: pathNames.villains,
  },
  {
    element: <TablePage />,
    path: pathNames.table,
  },
  {
    element: <HomePage />,
    path: '*',
  },
];

const LazyRoutes = () => {
  const contents = useRoutes(lazyRoutes);
  return <>{contents}</>;
};

export default LazyRoutes;

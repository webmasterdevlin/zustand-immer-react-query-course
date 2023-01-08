import React, { ElementType, lazy, Suspense } from 'react';
import { RouteObject, useRoutes } from 'react-router';
import { Keys } from 'react-hook-form/dist/types/path/common';

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<h1>Loading</h1>}>
      <Component {...props} />
    </Suspense>
  );

const HomePage = Loadable(lazy(() => import('./pages/HomePage')));
const HeroesPage = Loadable(lazy(() => import('./pages/HeroesPage')));
const AntiHeroesPage = Loadable(lazy(() => import('./pages/AntiHeroesPage')));
const VillainsPage = Loadable(lazy(() => import('./pages/VillainsPage')));

const TablePage = Loadable(lazy(() => import('./pages/TablePage')));

type Paths = {
  home: string;
  heroes: string;
  antiHeroes: string;
  villains: string;
  table: string;
};

type PageNames =
  | 'home'
  | 'heroes'
  | 'antiHeroes'
  | 'villains'
  | 'table'
  | string;
export const pathNames: Record<PageNames, string> = {
  home: '/',
  heroes: '/heroes',
  antiHeroes: '/anti-heroes',
  villains: '/villains',
  table: '/table',
};

const lazyRoutes: RouteObject[] = [
  {
    path: pathNames.home,
    element: <HomePage />,
  },
  {
    path: pathNames.heroes,
    element: <HeroesPage />,
  },
  {
    path: pathNames.antiHeroes,
    element: <AntiHeroesPage />,
  },
  {
    path: pathNames.villains,
    element: <VillainsPage />,
  },
  {
    path: pathNames.table,
    element: <TablePage />,
  },
  {
    path: '*',
    element: <HomePage />,
  },
];

const LazyRoutes = () => {
  const contents = useRoutes(lazyRoutes);
  return <>{contents}</>;
};

export default LazyRoutes;

import { QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Index from './pages';
import { loader as antiHeroesLoader } from './pages/antiHeroesPage';
import HeroesPage, { loader as heroesLoader } from './pages/heroesPage';
import Root from './pages/root';
import TablePage from './pages/tablePage';
import VillainsPage, { loader as villainsLoader } from './pages/villainsPage';

/* eslint-disable sort-keys-fix/sort-keys-fix */
export const pathNames = {
  home: '/',
  heroes: '/heroes',
  villains: '/villains',
  antiHeroes: '/anti-heroes',
  signUp: '/sign-up',
  signIn: '/sign-in',
  table: '/table',
} as const;

export const queryClient = new QueryClient();

// the comments below are purely for educational purposes
const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      {/* eager loading with loader*/}
      <Route index element={<Index />} />
      <Route
        path="/heroes"
        loader={() => {
          return heroesLoader(queryClient);
        }}
        element={<HeroesPage />}
      />
      {/* eager loading suspense wrapped with loader*/}
      <Route
        path="/villains"
        loader={() => {
          return villainsLoader(queryClient);
        }}
        element={
          <Suspense fallback={<h2>Fallback component from the VillainsPage suspense</h2>}>
            <VillainsPage />
          </Suspense>
        }
      />
      {/*  lazy loading with loader*/}
      <Route
        path="/anti-heroes"
        loader={() => {
          return antiHeroesLoader(queryClient);
        }}
        lazy={async () => {
          const { default: AntiHeroesPage } = await import('./pages/antiHeroesPage');
          return {
            element: (
              <Suspense fallback={<h1>Fallback component from the AntiHeroesPage suspense</h1>}>
                <AntiHeroesPage />
              </Suspense>
            ),
          };
        }}
      />
      {/*  lazy loading, no loader*/}
      <Route
        path="/sign-in"
        lazy={async () => {
          const { default: SignIn } = await import('./pages/sign-in');
          return { element: <SignIn /> };
        }}
      />
      {/*  lazy loading, no loader*/}
      <Route
        path="/sign-up"
        lazy={async () => {
          const { default: SignUp } = await import('./pages/sign-up');
          return { element: <SignUp /> };
        }}
      />
      {/*  eager loading, no loader*/}
      <Route path="/table" element={<TablePage />} />
    </Route>,
  ),
);

export default function Routes() {
  return (
    <Suspense fallback={<h1>Fallback component from the root suspense</h1>}>
      <RouterProvider router={routes} />
    </Suspense>
  );
}

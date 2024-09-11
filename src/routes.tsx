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

// selecting pages that are lazy loaded or eagerly loaded
const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Index />} />
      <Route
        path="/heroes"
        loader={() => {
          return heroesLoader(queryClient);
        }}
        element={<HeroesPage />}
      />
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
      <Route
        path="/sign-in"
        lazy={async () => {
          const { default: SignIn } = await import('./pages/sign-in');
          return { element: <SignIn /> };
        }}
      />
      <Route
        path="/sign-up"
        lazy={async () => {
          const { default: SignUp } = await import('./pages/sign-up');
          return { element: <SignUp /> };
        }}
      />
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

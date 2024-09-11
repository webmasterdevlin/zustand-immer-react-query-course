import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Index from './pages';
import HeroesPage from './pages/heroesPage';
import Root from './pages/root';
import VillainsPage from './pages/villainsPage';

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

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Index />} />
      <Route path="/heroes" element={<HeroesPage />} />
      <Route path="/villains" element={<VillainsPage />} />
      <Route
        path="/anti-heroes"
        lazy={async () => {
          const { default: AntiHeroesPage } = await import('./pages/antiHeroesPage');
          return { element: <AntiHeroesPage /> };
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
    </Route>,
  ),
);

export default function Routes() {
  return <RouterProvider router={routes} />;
}

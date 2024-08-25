import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, useRouterState, createRootRoute, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import NavigationBar from '../components/NavigationBar';
import Spinner from '../components/Spinner';
import type { QueryClient } from '@tanstack/react-query';

/* Show a global spinner when the router is transitioning */
function RouterSpinner() {
  const isLoading = useRouterState({
    select: s => {
      return s.status === 'pending';
    },
  });
  return <Spinner show={isLoading} />;
}

type RouterContextType = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContextType>()({
  component: RootComponent,
  notFoundComponent: () => {
    return <h1>Fancy meeting you here. Tell the developers to customize this page.</h1>;
  },
});

function RootComponent() {
  return (
    <>
      <NavigationBar />
      <div className={'bg-white px-6 py-8 shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800 dark:text-white'}>
        <RouterSpinner />
        <Outlet />
      </div>
      <ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}

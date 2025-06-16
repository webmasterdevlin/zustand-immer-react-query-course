import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, ErrorComponent, RouterProvider } from '@tanstack/react-router';
import { useEffect } from 'react';
import Spinner from './components/Spinner';
import { Toaster } from './components/toaster';
import { routeTree } from './routeTree.gen';
import { useTheme } from './store/themeStore';

export const queryClient = new QueryClient();

const router = createRouter({
  context: {
    queryClient: queryClient,
  },
  defaultErrorComponent: ({ error }: any) => {
    return <ErrorComponent error={error} />;
  },
  defaultPendingComponent: () => {
    return (
      <div className={'p-2 text-2xl'}>
        <Spinner />
      </div>
    );
  },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  routeTree,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const { isDark } = useTheme();

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

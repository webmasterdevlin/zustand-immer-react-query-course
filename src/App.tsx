import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, ErrorComponent, RouterProvider } from '@tanstack/react-router';
import { useEffect } from 'react';
import Spinner from './components/Spinner';
import { routeTree } from './routeTree.gen';
import { useThemeStore } from './store/themeStore';

const router = createRouter({
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
  routeTree,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

function App() {
  const { isDark } = useThemeStore(state => {
    return state.theme;
  });

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
    </QueryClientProvider>
  );
}

export default App;

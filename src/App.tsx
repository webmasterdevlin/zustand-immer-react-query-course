import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';

import NavigationBar from './components/NavigationBar';
import { useThemeStore } from './store/themeStore';
import type { ThemeStoreType } from './store/themeStore';

export const queryClient = new QueryClient();

function App() {
  const { isDark } = useThemeStore((state: ThemeStoreType) => {
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
      <BrowserRouter>
        <NavigationBar />
        <div className={'bg-white px-6 py-8 shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800 dark:text-white'}>
          <Routes />
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

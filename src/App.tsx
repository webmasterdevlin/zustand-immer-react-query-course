import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Routes from './Routes';

import { ThemeStoreType, useThemeStore } from './store/themeStore';

export const queryClient = new QueryClient();

function App() {
  const { isDark } = useThemeStore((state: ThemeStoreType) => state.theme);

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
        <div
          className={
            'bg-white dark:bg-slate-800 dark:text-white px-6 py-8 ring-1 ring-slate-900/5 shadow-xl'
          }
        >
          <Routes />
        </div>
        <ReactQueryDevtools initialIsOpen />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

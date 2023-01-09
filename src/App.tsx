import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Routes from './Routes';

import { useThemeUtils } from './themes/useThemeUtils';

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NavigationBar />
        <div className={'dark'}>
          <div
            className={
              'bg-white light:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl'
            }
          >
            <Routes />
          </div>
        </div>
        <ReactQueryDevtools initialIsOpen />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

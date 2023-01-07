import React from 'react';
import './App.css';
import {
  AppShell,
  Navbar,
  Header,
  MantineProvider,
  MantineTheme,
} from '@mantine/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Routes from './Routes';
import { useThemeStore } from './store/themeStore';
import { useThemeUtils } from './themes/useThemeUtils';

export const queryClient = new QueryClient();

function App() {
  const { getBgColor, getFontColor } = useThemeUtils();
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <BrowserRouter>
          <AppShell
            padding="md"
            header={
              <Header height={60} p="xs">
                <NavigationBar />
              </Header>
            }
            styles={theme => ({
              main: {
                backgroundColor: getBgColor(theme),
                color: getFontColor(theme),
              },
            })}
          >
            <Routes />
            <ReactQueryDevtools initialIsOpen />
          </AppShell>
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import { queryClient } from '../App';

type Props = {
  children: React.ReactNode;
};

let wrapper = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const render: any = (
  ui: any,
  { store = new QueryClient(), ...renderOptions } = {},
) => {
  wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <>
          <NavigationBar />
          <>{children}</>
          <ReactQueryDevtools initialIsOpen />
        </>
      </BrowserRouter>
    </QueryClientProvider>
  );

  return rtlRender(ui, { wrapper, ...renderOptions });
};

export * from '@testing-library/react';
// override render method
export { render, wrapper };

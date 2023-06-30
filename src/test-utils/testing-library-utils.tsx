import '@testing-library/jest-dom/extend-expect';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import type { QueryProviderWrapperProps } from './create-query-provider-wrapper';
import type { ReactElement } from 'react';

const queryClient = new QueryClient();

const render = (ui: ReactElement, { ...renderOptions } = {}) => {
  const wrapper = ({ children }: QueryProviderWrapperProps) => {
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <>
            <NavigationBar />
            <>{children}</>
          </>
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  return rtlRender(ui, { wrapper, ...renderOptions });
};

export * from '@testing-library/react';
// override render method
export { render };

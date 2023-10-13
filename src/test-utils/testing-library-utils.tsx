// import '@testing-library/jest-dom/extend-expect';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render as rtlRender } from '@testing-library/react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import FallbackRenderer from '../components/FallbackRenderer';
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
            <ErrorBoundary fallbackRender={FallbackRenderer}>
              <div
                className={' bg-white px-6 py-8 shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800 dark:text-white'}
              >
                {children}
              </div>
            </ErrorBoundary>
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

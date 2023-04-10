import '@testing-library/jest-dom/extend-expect';
import { render as rtlRender } from '@testing-library/react';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { queryClient } from '../App';
import NavigationBar from '../components/NavigationBar';
import type { QueryProviderWrapperProps } from './create-query-provider-wrapper';
import type { ReactElement } from 'react';

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

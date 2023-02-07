import '@testing-library/jest-dom/extend-expect';
import { render as rtlRender } from '@testing-library/react';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { queryClient } from '../App';
import NavigationBar from '../components/NavigationBar';

const render: any = (ui: any, { ...renderOptions } = {}) => {
  const wrapper = ({ children }: any) => {
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

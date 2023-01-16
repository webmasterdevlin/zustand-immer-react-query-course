import '@testing-library/jest-dom/extend-expect';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import { queryClient } from '../App';

const render: any = (
  ui: any,
  { store = new QueryClient(), ...renderOptions } = {},
) => {
  const wrapper = ({ children }: any) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <>
          <NavigationBar />
          <>{children}</>
        </>
      </BrowserRouter>
    </QueryClientProvider>
  );

  return rtlRender(ui, { wrapper, ...renderOptions });
};

export * from '@testing-library/react';
// override render method
export { render };

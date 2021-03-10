import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { render as rtlRender } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import NavigationBar from "../components/NavigationBar";
import { queryClient } from "../App";

const render = (ui, { store = new QueryClient(), ...renderOptions } = {}) => {
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <CssBaseline>
        <BrowserRouter>
          <>
            <NavigationBar />
            <Container>{children}</Container>
            <ReactQueryDevtools initialIsOpen />
          </>
        </BrowserRouter>
      </CssBaseline>
    </QueryClientProvider>
  );

  return rtlRender(ui, { wrapper, ...renderOptions });
};

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };

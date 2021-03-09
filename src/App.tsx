import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import Container from "@material-ui/core/Container";

import NavigationBar from "./components/NavigationBar";
import routes, { renderRoutes } from "./Routes";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline>
        <BrowserRouter>
          <>
            <NavigationBar />
            <Container>{renderRoutes(routes)}</Container>
            <ReactQueryDevtools initialIsOpen />
          </>
        </BrowserRouter>
      </CssBaseline>
    </QueryClientProvider>
  );
}

export default App;

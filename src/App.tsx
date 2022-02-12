import React from "react";
import "./App.css";
import { Container, CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import Routes from "./Routes";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline>
        <BrowserRouter>
          <>
            <NavigationBar />
            <Container>
              <Routes />
            </Container>
            <ReactQueryDevtools initialIsOpen />
          </>
        </BrowserRouter>
      </CssBaseline>
    </QueryClientProvider>
  );
}

export default App;

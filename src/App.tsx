import React from "react";
import "./App.css";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import Routes from "./Routes";
import { useThemeStore } from "./store/themeStore";

export const queryClient = new QueryClient();

function App() {
  const theme = useThemeStore((state) => state.theme);

  const darkTheme = createTheme({
    palette: {
      mode: theme.isDark ? "dark" : "light",
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
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
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

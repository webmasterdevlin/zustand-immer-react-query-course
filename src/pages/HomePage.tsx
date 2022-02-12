import React from "react";
import { Box, Typography, Container } from "@mui/material";

import { ReactQueryDevtools } from "react-query/devtools";

const HomePage = () => {
  return (
    <Container>
      <Box
        width={"100%"}
        display={"flex"}
        flex={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography variant={"h2"}>
          Welcome to React Query Course 🧑‍🏫 💻
        </Typography>
      </Box>
      <ReactQueryDevtools initialIsOpen />
    </Container>
  );
};

export default HomePage;

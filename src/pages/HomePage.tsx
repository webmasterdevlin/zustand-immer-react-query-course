import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
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

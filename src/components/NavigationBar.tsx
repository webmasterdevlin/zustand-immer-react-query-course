import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { AppBar, Box, Button, createStyles, Toolbar } from "@material-ui/core";
import TotalOfCharacters from "./TotalOfCharacters";
import { makeStyles } from "@material-ui/styles";
import { queryClient } from "../App";
import { HeroModel } from "../features/heroes/hero";

const NavigationBar = () => {
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <AppBar position="static" style={{ marginBottom: "2rem" }}>
      <Toolbar>
        <Box>
          <Button
            className={classes.button}
            onClick={() => history.push("/")}
            color="inherit"
          >
            Home
          </Button>
        </Box>
        <Box>
          <Button
            className={classes.button}
            onClick={() => history.push("/anti-heroes")}
            color="inherit"
          >
            Anti Heroes
          </Button>
          {/*<TotalOfCharacters*/}
          {/*  collection={store.antiHero.antiHeroes}*/}
          {/*  role={"total-anti-heroes"}*/}
          {/*/>*/}
        </Box>
        <Box>
          <Button
            className={classes.button}
            onClick={() => history.push("/heroes")}
            color="inherit"
          >
            Heroes
          </Button>

          <pre>
            {
              queryClient.getQueryState<{ data: HeroModel[] }>("heroes")?.data
                ?.data?.length
            }
          </pre>
        </Box>
        <Box>
          <Button
            className={classes.button}
            onClick={() => history.push("/villains")}
            color="inherit"
          >
            Villains
          </Button>
          {/*<TotalOfCharacters*/}
          {/*  collection={queryClient.getQueryData(["heroes"]) as any[]}*/}
          {/*  role={"total-villains"}*/}
          {/*/>*/}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      margin: "0 0.5rem",
      "&:focus": {
        outline: "none",
      },
    },
  })
);

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import TotalOfCharacters from "./TotalOfCharacters";
import useFetchHeroes from "features/heroes/hooks/useFetchHeroes";
import useFetchAntiHeroes from "features/anti-heroes/hooks/useFetchAntiHeroes";
import useFetchVillains from "features/villains/hooks/useFetchVillains";

const NavigationBar = () => {
  const navigate = useNavigate();
  const { data: antiHeroes } = useFetchAntiHeroes();
  const { data: heroes } = useFetchHeroes();
  const { data: villains } = useFetchVillains();
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <AppBar position="static" style={{ marginBottom: "2rem" }}>
      <Toolbar>
        <Box>
          <Button
            className={classes.button}
            onClick={() => navigate("/")}
            color="inherit"
          >
            Home
          </Button>
        </Box>
        <Box>
          <Button
            className={classes.button}
            onClick={() => navigate("/anti-heroes")}
            color="inherit"
            data-testid="nav-anti-heroes"
          >
            Anti Heroes
          </Button>
          <TotalOfCharacters
            collection={antiHeroes?.data}
            dataTestId={"total-anti-heroes"}
          />
        </Box>
        <Box>
          <Button
            className={classes.button}
            onClick={() => navigate("/heroes")}
            color="inherit"
            data-testid="nav-heroes"
          >
            Heroes
          </Button>
          <TotalOfCharacters
            collection={heroes?.data}
            dataTestId={"total-heroes"}
          />
        </Box>
        <Box>
          <Button
            className={classes.button}
            onClick={() => navigate("/villains")}
            color="inherit"
            data-testid="nav-villains"
          >
            Villains
          </Button>
          <TotalOfCharacters
            collection={villains?.data}
            dataTestId={"total-villains"}
          />
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

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, FormControlLabel, Toolbar } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import Switch from '@mui/material/Switch';

import TotalOfCharacters from './TotalOfCharacters';
import useFetchHeroes from '../features/heroes/hooks/useFetchHeroes';
import useFetchAntiHeroes from '../features/anti-heroes/hooks/useFetchAntiHeroes';
import useFetchVillains from '../features/villains/hooks/useFetchVillains';
import { useThemeStore } from '../store/themeStore';
import { pathNames } from '../Routes';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const NavigationBar = () => {
  const { setDarkTheme, setLightTheme } = useThemeStore();
  const theme = useThemeStore(state => state.theme);

  const navigate = useNavigate();
  const { data: antiHeroes } = useFetchAntiHeroes();
  const { data: heroes } = useFetchHeroes();
  const { data: villains } = useFetchVillains();
  const classes = useStyles();

  useEffect(() => {}, []);

  const handleChange = event => {
    if (event.target.checked) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  };
  return (
    <AppBar position="static" style={{ marginBottom: '2rem' }}>
      <Toolbar>
        <Box mr={4}>
          <Button
            className={classes.button}
            onClick={() => navigate('/')}
            color="inherit"
          >
            Home
          </Button>
        </Box>
        <Box mr={4}>
          <Button
            className={classes.button}
            onClick={() => navigate(pathNames.antiHeroes)}
            color="inherit"
            data-testid="nav-anti-heroes"
          >
            Anti Heroes
          </Button>
          <TotalOfCharacters
            collection={antiHeroes?.data}
            dataTestId={'total-anti-heroes'}
          />
        </Box>
        <Box mr={4}>
          <Button
            className={classes.button}
            onClick={() => navigate(pathNames.heroes)}
            color="inherit"
            data-testid="nav-heroes"
          >
            Heroes
          </Button>
          <TotalOfCharacters
            collection={heroes?.data}
            dataTestId={'total-heroes'}
          />
        </Box>
        <Box mr={4}>
          <Button
            className={classes.button}
            onClick={() => navigate(pathNames.villains)}
            color="inherit"
            data-testid="nav-villains"
          >
            Villains
          </Button>
          <TotalOfCharacters
            collection={villains?.data}
            dataTestId={'total-villains'}
          />
        </Box>
        <Box mr={4}>
          <Button
            className={classes.button}
            onClick={() => navigate(pathNames.table)}
            color="inherit"
          >
            Table
          </Button>
        </Box>
        <Box>
          <FormControlLabel
            control={
              <Switch
                {...label}
                onChange={handleChange}
                checked={theme.isDark}
              />
            }
            label="Dark Mode"
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
      margin: '0 0.5rem',
      '&:focus': {
        outline: 'none',
      },
    },
  }),
);

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme, useThemeActions } from '../clientState/themeStore';
import { pathNames } from '../routes';
import { Button } from './ui/button';

const NavigationBar = () => {
  const { setDarkTheme, setLightTheme } = useThemeActions();
  const theme = useTheme();

  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {Object.entries(pathNames)?.map(([key, value], index) => {
          return (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => {
                navigate(value);
              }}
            >
              {key}
            </Button>
          );
        })}
      </div>
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={theme.isDark ? setLightTheme : setDarkTheme}>
          {theme.isDark ? <Sun className={'h-4 w-4'} /> : <Moon className={'h-4 w-4'} />}
        </Button>
      </div>
    </nav>
  );
};

export default NavigationBar;

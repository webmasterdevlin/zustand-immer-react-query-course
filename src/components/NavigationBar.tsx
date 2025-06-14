import { Link } from '@tanstack/react-router';
import { Sun as SunIcon, Moon as MoonIcon } from 'react-feather';
import { Button } from './ui/button';
import { useTheme, useThemeActions } from '../store/themeStore';
import { root } from '../utils/routePaths';

const NavigationBar = () => {
  const { setDarkTheme, setLightTheme } = useThemeActions();
  const theme = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {root.map(([to, label]) => {
            return (
              <Link
                to={to}
                key={to}
                preload="intent"
                className="transition-colors hover:text-foreground/80"
                activeProps={{
                  className: 'text-foreground font-semibold',
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={theme.isDark ? setLightTheme : setDarkTheme} className="h-9 w-9">
            {theme.isDark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;

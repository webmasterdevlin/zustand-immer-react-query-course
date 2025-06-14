import { Link } from '@tanstack/react-router';
import { Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme, useThemeActions } from '../store/themeStore';
import { root } from '../utils/routePaths';

const NavigationBar = () => {
  const { setDarkTheme, setLightTheme } = useThemeActions();
  const theme = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Hero Management</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            {root.map(([to, label]) => {
              return (
                <Link
                  to={to}
                  key={to}
                  preload="intent"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                  activeProps={{
                    className: 'text-foreground font-medium',
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* You can add a search component here if needed */}
          </div>
          <nav className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={theme.isDark ? setLightTheme : setDarkTheme}
              className="h-8 w-8 px-0"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;

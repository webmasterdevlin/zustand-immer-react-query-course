import { Link } from '@tanstack/react-router';
import { Sun as SunIcon, Moon as MoonIcon } from 'react-feather';
import { useThemeStore } from '../store/themeStore';
import { root } from '../utils/routePaths';

const NavigationBar = () => {
  const { setDarkTheme, setLightTheme } = useThemeStore();
  const theme = useThemeStore(state => {
    return state.theme;
  });

  return (
    <>
      <div className={'mih-50 flex flex-row flex-wrap items-center justify-between pt-4'}>
        <div className="ml-10 flex items-baseline gap-2 space-x-4">
          {root.map(([to, label]) => {
            return (
              <Link to={to} key={to} preload="intent" className="mb-2 mr-2" activeProps={{ className: 'font-bold' }}>
                {label}
              </Link>
            );
          })}
        </div>
        <div>
          <div className={'mih-50 flex flex-row flex-wrap items-center justify-between gap-10 pr-10'}>
            {theme.isDark ? (
              <SunIcon className={'cursor-pointer'} onClick={setLightTheme} />
            ) : (
              <MoonIcon className={'cursor-pointer'} onClick={setDarkTheme} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;

import { Link } from '@tanstack/react-router';
import { Sun as SunIcon, Moon as MoonIcon } from 'react-feather';

import useFetchAntiHeroes from '../features/anti-heroes/hooks/useFetchAntiHeroes';
import useFetchHeroes from '../features/heroes/hooks/useFetchHeroes';
import useFetchVillains from '../features/villains/hooks/useFetchVillains';
import { useThemeStore } from '../store/themeStore';
import { root } from '../utils/routePaths';
import TotalOfCharacters from './TotalOfCharacters';

const NavigationBar = () => {
  const { setDarkTheme, setLightTheme } = useThemeStore();
  const theme = useThemeStore(state => {
    return state.theme;
  });

  const { data: antiHeroes } = useFetchAntiHeroes();
  const { data: heroes } = useFetchHeroes();
  const { data: villains } = useFetchVillains();

  return (
    <>
      <div className={'mih-50 flex flex-row flex-wrap items-center justify-between'}>
        <div className="ml-10 flex items-baseline gap-2 space-x-4">
          {root.map(([to, label]) => {
            return (
              <Link
                to={to}
                key={to}
                preload="intent"
                className="hidden rounded-md px-3 py-2 text-sm capitalize text-gray-300 hover:bg-gray-700 hover:text-white md:block"
                activeProps={{ className: 'font-bold' }}
              >
                {label}
              </Link>
            );
          })}
        </div>
        <div>
          <div className={'flex'}>
            <TotalOfCharacters label={'heroes'} collection={heroes?.data} />
            <TotalOfCharacters label={'anti-heroes'} collection={antiHeroes?.data} />
            <TotalOfCharacters label={'villains'} collection={villains?.data} />
          </div>
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

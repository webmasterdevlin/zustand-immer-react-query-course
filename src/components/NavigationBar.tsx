import React from 'react';
import { Sun as SunIcon, Moon as MoonIcon } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { pathNames } from '../Routes';
import useFetchAntiHeroes from '../features/anti-heroes/hooks/useFetchAntiHeroes';
import useFetchHeroes from '../features/heroes/hooks/useFetchHeroes';
import useFetchVillains from '../features/villains/hooks/useFetchVillains';
import { useThemeStore } from '../store/themeStore';
import TotalOfCharacters from './TotalOfCharacters';
import type { ThemeStoreType } from '../store/themeStore';

const NavigationBar = () => {
  const { setDarkTheme, setLightTheme } = useThemeStore();
  const themeStore = useThemeStore((state: ThemeStoreType) => {
    return state.theme;
  });

  const navigate = useNavigate();
  const { data: antiHeroes } = useFetchAntiHeroes();
  const { data: heroes } = useFetchHeroes();
  const { data: villains } = useFetchVillains();

  return (
    <>
      <div className={'mih-50 flex flex-row flex-wrap items-center justify-between'}>
        <div>
          {Object.entries(pathNames)?.map(([key, value], index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  navigate(value);
                }}
                className={'btn capitalize'}
              >
                {key}
              </button>
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
            {themeStore.isDark ? (
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

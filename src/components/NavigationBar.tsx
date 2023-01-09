import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchHeroes from '../features/heroes/hooks/useFetchHeroes';
import useFetchAntiHeroes from '../features/anti-heroes/hooks/useFetchAntiHeroes';
import useFetchVillains from '../features/villains/hooks/useFetchVillains';
import { ThemeStoreType, useThemeStore } from '../store/themeStore';
import { pathNames } from '../Routes';
import TotalOfCharacters from './TotalOfCharacters';
import { Sun as SunIcon, Moon as MoonIcon, Moon } from 'react-feather';

const NavigationBar = () => {
  const { setDarkTheme, setLightTheme } = useThemeStore();
  const themeStore = useThemeStore((state: ThemeStoreType) => state.theme);

  const navigate = useNavigate();
  const { data: antiHeroes } = useFetchAntiHeroes();
  const { data: heroes } = useFetchHeroes();
  const { data: villains } = useFetchVillains();

  return (
    <>
      <div
        className={`flex flex-row justify-between items-center flex-wrap mih-50`}
      >
        <div>
          {Object.keys(pathNames)?.map((key, index) => {
            return (
              <button
                key={index}
                onClick={() => navigate(pathNames[key])}
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
            <TotalOfCharacters
              label={'anti-heroes'}
              collection={antiHeroes?.data}
            />
            <TotalOfCharacters label={'villains'} collection={villains?.data} />
          </div>
        </div>
        <div>
          <div
            className={
              'flex flex-row justify-between items-center flex-wrap mih-50 gap-10 pr-10'
            }
          >
            {themeStore.isDark ? (
              <SunIcon
                className={'cursor-pointer'}
                onClick={() => setLightTheme()}
              />
            ) : (
              <MoonIcon
                className={'cursor-pointer'}
                onClick={() => setDarkTheme()}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;

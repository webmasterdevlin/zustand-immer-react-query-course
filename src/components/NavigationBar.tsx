import React from 'react';
import { Sun as SunIcon, Moon as MoonIcon } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import useFetchAntiHeroes from '../features/anti-heroes/hooks/useFetchAntiHeroes';
import useFetchHeroes from '../features/heroes/hooks/useFetchHeroes';
import useFetchVillains from '../features/villains/hooks/useFetchVillains';
import { pathNames } from '../routes';
import { useThemeStore } from '../store/themeStore';
import Button from './Button';
import TotalOfCharacters from './TotalOfCharacters';

const NavigationBar = () => {
  const { setDarkTheme, setLightTheme } = useThemeStore();
  const theme = useThemeStore(state => {
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
              <Button
                key={index}
                onClick={() => {
                  navigate(value);
                }}
              >
                {key}
              </Button>
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

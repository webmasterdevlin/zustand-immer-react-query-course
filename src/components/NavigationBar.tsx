import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchHeroes from '../features/heroes/hooks/useFetchHeroes';
import useFetchAntiHeroes from '../features/anti-heroes/hooks/useFetchAntiHeroes';
import useFetchVillains from '../features/villains/hooks/useFetchVillains';
import { ThemeStoreType, useThemeStore } from '../store/themeStore';
import { pathNames } from '../Routes';
import TotalOfCharacters from './TotalOfCharacters';
import { IconBrightnessHalf } from '@tabler/icons';

const NavigationBar = () => {
  const { setDarkTheme, setLightTheme } = useThemeStore();
  const themeStore = useThemeStore((state: ThemeStoreType) => state.theme);

  const navigate = useNavigate();
  const { data: antiHeroes } = useFetchAntiHeroes();
  const { data: heroes } = useFetchHeroes();
  const { data: villains } = useFetchVillains();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  };

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
              'flex flex-row justify-between items-center flex-wrap mih-50 gap-10'
            }
          >
            <IconBrightnessHalf
              size={24} // set custom `width` and `height`
              color="grey" // set `stroke` color
              stroke={3} // set `stroke-width`
              strokeLinejoin="miter" // override other SVG props
            />
            <div className="flex justify-center">
              <div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
                    type="checkbox"
                    role="switch"
                    onChange={handleChange}
                    checked={themeStore.isDark}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;

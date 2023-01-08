import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchHeroes from '../features/heroes/hooks/useFetchHeroes';
import useFetchAntiHeroes from '../features/anti-heroes/hooks/useFetchAntiHeroes';
import useFetchVillains from '../features/villains/hooks/useFetchVillains';
import { useThemeStore } from '../store/themeStore';
import { pathNames } from '../Routes';
import { Button, Switch, Flex } from '@mantine/core';
import { IconBrightnessHalf } from '@tabler/icons';
import TotalOfCharacters from './TotalOfCharacters';

const NavigationBar = () => {
  const { setDarkTheme, setLightTheme } = useThemeStore();
  const themeStore = useThemeStore(state => state.theme);

  const navigate = useNavigate();
  const { data: antiHeroes } = useFetchAntiHeroes();
  const { data: heroes } = useFetchHeroes();
  const { data: villains } = useFetchVillains();

  const handleChange = event => {
    if (event.target.checked) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  };

  return (
    <>
      <Flex
        mih={50}
        gap="md"
        justify="space-between"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <div>
          {Object.keys(pathNames)?.map((key, index) => {
            return (
              <Button
                key={index}
                variant="subtle"
                uppercase
                onClick={() => navigate(pathNames[key])}
              >
                {key}
              </Button>
            );
          })}
        </div>
        <div>
          <Flex>
            <TotalOfCharacters label={'heroes'} collection={heroes?.data} />
            <TotalOfCharacters
              label={'anti-heroes'}
              collection={antiHeroes?.data}
            />
            <TotalOfCharacters label={'villains'} collection={villains?.data} />
          </Flex>
        </div>
        <div>
          <Flex
            mih={50}
            gap="md"
            justify="flex-start"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <IconBrightnessHalf
              size={24} // set custom `width` and `height`
              color="grey" // set `stroke` color
              stroke={3} // set `stroke-width`
              strokeLinejoin="miter" // override other SVG props
            />
            <Switch
              size={'xs'}
              onChange={handleChange}
              checked={themeStore.isDark}
            />
          </Flex>
        </div>
      </Flex>
    </>
  );
};

export default NavigationBar;

import { MantineTheme } from '@mantine/core';
import { useThemeStore } from '../store/themeStore';

// below is a custom hook
export function useThemeUtils() {
  const themeStore = useThemeStore(state => state.theme);

  const getBgColor = (theme: MantineTheme) => {
    return themeStore.isDark ? theme.colors.dark[8] : theme.colors.gray[0];
  };

  const getFontColor = (theme: MantineTheme) => {
    return themeStore.isDark ? theme.colors.gray[0] : theme.colors.dark[8];
  };

  return {
    getBgColor,
    getFontColor,
  };
}

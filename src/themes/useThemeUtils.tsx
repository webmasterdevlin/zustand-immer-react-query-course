import { ThemeStoreType, useThemeStore } from '../store/themeStore';

// below is a custom hook
export function useThemeUtils() {
  const themeStore = useThemeStore((state: ThemeStoreType) => state.theme);

  const toggleDarkMode = () => {
    return themeStore.isDark ? 'dark' : 'light';
  };

  return {
    toggleDarkMode,
  };
}

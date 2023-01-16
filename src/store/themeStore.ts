import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import produce, { Draft } from 'immer';

export type ThemeModel = {
  isDark: boolean;
  user: string;
};

export type ThemeStoreType = {
  theme: ThemeModel;
  setLightTheme: () => void;
  setDarkTheme: () => void;
};

export const useThemeStore = create<ThemeStoreType, any>(
  persist(
    (set, get) => {
      const theme = {
        isDark: false,
        user: 'John Doe',
      };

      // without immer
      const setLightTheme = () =>
        set(state => ({ theme: { isDark: false, user: get().theme.user } }));

      // with immer
      const setDarkTheme = () =>
        set(
          produce((draft: Draft<ThemeStoreType>) => {
            draft.theme.isDark = true;
          }),
        );

      return {
        theme,
        setDarkTheme,
        setLightTheme,
      };
    },
    {
      name: 'themeStore',
    },
  ),
);

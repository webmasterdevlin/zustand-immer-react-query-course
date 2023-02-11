import produce from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Draft } from 'immer';

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
      const setLightTheme = () => {
        return set(_ => {
          return {
            theme: { ...get().theme, isDark: false },
          };
        });
      };

      // with immer
      const setDarkTheme = () => {
        return set(
          produce((draft: Draft<ThemeStoreType>) => {
            draft.theme.isDark = true;
          }),
        );
      };

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

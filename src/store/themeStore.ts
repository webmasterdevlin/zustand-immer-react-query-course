import { produce } from 'immer';
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
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
  devtools(
    persist(
      (set, get) => {
        const theme = {
          isDark: false,
          user: 'John Doe',
        };

        // without immer
        const setLightTheme = () => {
          return set(
            _ => {
              return {
                theme: { ...get().theme, isDark: false },
              };
            },
            false,
            'setLightTheme',
          );
        };

        // with immer
        const setDarkTheme = () => {
          return (
            set(
              produce((draft: Draft<ThemeStoreType>) => {
                draft.theme.isDark = true;
              }),
            ),
            false,
            'setDarkTheme'
          );
        };

        return {
          setDarkTheme,
          setLightTheme,
          theme,
        };
      },
      {
        name: 'themeStore',
      },
    ),
  ),
);

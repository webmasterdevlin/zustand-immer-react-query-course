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
  actions: {
    setLightTheme: () => void;
    setDarkTheme: () => void;
  };
};

const useThemeStore = create<ThemeStoreType>()(
  devtools(
    persist(
      set => {
        const theme = {
          isDark: false,
          user: 'John Doe',
        };

        // without immer
        const setLightTheme = () => {
          return set(
            state => {
              return {
                theme: { ...state.theme, isDark: false },
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
          actions: { setDarkTheme, setLightTheme },
          theme,
        };
      },
      {
        name: 'themeStore',
      },
    ),
  ),
);

export const useTheme = () => {
  return useThemeStore(state => {
    return state.theme;
  });
};

export const useThemeActions = () => {
  return useThemeStore(state => {
    return state.actions;
  });
};

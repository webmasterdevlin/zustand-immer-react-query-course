import create from "zustand";
import produce, { Draft } from "immer";
import { configurePersist } from "zustand-persist";
import { mountStoreDevtool } from "simple-zustand-devtools";

const { persist, purge } = configurePersist({
  storage: localStorage,
});

export type ThemeModel = {
  isDark: boolean;
};

export type ThemeStoreType = {
  theme: ThemeModel;
  setDarkTheme: () => void;
  setLightTheme: () => void;
};

export const useThemeStore = create<ThemeStoreType>(
  persist(
    {
      key: "themeStore",
    },
    (set): ThemeStoreType => ({
      theme: {
        isDark: false,
      },
      setDarkTheme: () =>
        set(
          produce((draft: Draft<ThemeStoreType>) => {
            draft.theme.isDark = true;
          })
        ),
      setLightTheme: () =>
        set(
          produce((draft: Draft<ThemeStoreType>) => {
            draft.theme.isDark = false;
          })
        ),
    })
  )
);

mountStoreDevtool("themeStore", useThemeStore as any);

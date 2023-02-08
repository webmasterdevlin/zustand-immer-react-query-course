// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MODE: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_SOME_KEY: string;
  readonly VITE_USER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

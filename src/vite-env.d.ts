/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_SOME_KEY: string;
  readonly DB_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

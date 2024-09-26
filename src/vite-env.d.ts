/// <reference types="vite/client" />

interface ImportMeta {
  readonly env?: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly MODE: string;
  readonly BASE_URL: string;
  readonly PROD: boolean;
  readonly DEV: boolean;
  readonly SSR: boolean;
  readonly [key: `VITE_${string}`]: string | undefined;
}

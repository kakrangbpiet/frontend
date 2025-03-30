/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite/client" />

declare module '*.css' {
    const styles: { [key: string]: string };
    export default styles;
  }
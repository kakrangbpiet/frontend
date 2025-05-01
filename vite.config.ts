import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import dts from "vite-plugin-dts";
import tailwind from '@tailwindcss/vite' // ESM import

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      "/v1": "https://backend-am9k.onrender.com/",
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase', // optional, for CSS Modules
    },
     postcss: './postcss.config.js'
  
  },
  optimizeDeps: {
    include: ['swiper'],
  },
  plugins: [
    react(),
    tailwind(),
    VitePWA({
      registerType: 'autoUpdate',
       injectRegister: 'auto',
      devOptions: {
        enabled: false
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        // runtimeCaching: [
        //   {
        //     urlPattern: ({ request }) => request.mode === 'navigate',
        //     handler: 'NetworkFirst',
        //   },
        // ],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'maskable-icon.svg'],
      manifest: {
        name: "Samsara Adventures",
        short_name: "Samsara",
        description: 'My Awesome App description',
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#4285f4",
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
      }
    }),
       dts(),
  ],
  build: {
    // lib: {
    //   entry: "src/index.ts",
    //   name: "MyLib",
    //   fileName: (format) => `mylib.${format}.js`,
    //   formats: ["es", "cjs", "umd"], 
    // },
    // rollupOptions: {
    //   external: ["react", "react-dom"],
    //   output: {
    //     globals: {
    //       react: "React",
    //       "react-dom": "ReactDOM",
    //     },
    //   },
    // },
  },
})
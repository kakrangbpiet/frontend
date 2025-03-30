import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import dts from "vite-plugin-dts";

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      "/v1": "http://localhost:3000/",
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
          },
        ],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: "Your App Name",
        short_name: "YourApp",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#4285f4",
        icons: [
          {
            src: "icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
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
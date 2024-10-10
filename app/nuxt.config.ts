// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['nuxt-electron', '@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      version: "3.0.0-canary",
      scrcpyPath: "resources/scrcpy/",
      releasesUrl: "https://api.github.com/repos/Frontesque/scrcpy-plus/releases",
      devicePollRate: 1250,
    }
  },
  electron: {
    build: [
      {
        // Main-Process entry file of the Electron App.
        entry: 'electron/main.ts',
      },
    ],
  },
})

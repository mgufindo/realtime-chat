// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  devServer: {
    port: Number(process.env.PORT),
  },
  runtimeConfig: {
    apiBase: process.env.API_BASE_URL,
    
  },
  css: ["~/assets/css/custom.css","~/assets/css/icons.css"],
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon", "@vueuse/nuxt"],
  tailwindcss: {
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
    exposeConfig: {
      level: 2,
    },
    config: {},
    viewer: false,
  },
});
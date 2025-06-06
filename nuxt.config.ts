// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    '@/assets/styles/global.scss'
  ],
  modules: ['@nuxtjs/device'],
  device: {
    refreshOnResize: true
  }
})

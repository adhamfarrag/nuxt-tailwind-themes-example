export default {
  head: {
    title: 'nuxt-tailwind-themes',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [],

  plugins: [],

  components: true,

  buildModules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],

  modules: ['@nuxt/content'],

  tailwindcss: {
    exposeConfig: true,
    viewer: false,
  },

  colorMode: {
    classSuffix: '',
    preference: 'dark', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
  },

  content: {},

  build: {
    standalone: true,
  },
}

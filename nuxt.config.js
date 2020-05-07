export default {
  mode: 'spa',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'assets/normalize.scss'
  ],
  plugins: [
    '@/plugins/at-components',
    '@/plugins/element-ui'
  ],
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    [
      'nuxt-i18n',
      {
        locales: ['en', 'zh-TW'],
        defaultLocale: 'zh-TW',
        vueI18n: {
          fallbackLocale: 'en',
        }
      }
    ]
  ],
  styleResources: {
    scss: [
      './assets/variables.scss'
    ]
  },
  axios: {
  },
  build: {
    transpile: [/^element-ui/],
    extend (config, ctx) {
    }
  }
}

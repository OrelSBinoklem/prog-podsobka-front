import path from 'path'

export default {
  ssr: false,

  srcDir: __dirname,

  env: {
    apiUrl: process.env.API_URL || process.env.APP_URL + '/api',
    storageUrl: process.env.STORAGE_URL || process.env.APP_URL + '/storage',
    appName: process.env.APP_NAME || 'Laravel Nuxt',
    appLocale: process.env.APP_LOCALE || 'ru',
    githubAuth: !!process.env.GITHUB_CLIENT_ID
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.APP_NAME,
    titleTemplate: '%s - ' + process.env.APP_NAME,
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
            "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
      },
      {
        rel: "stylesheet",
        href:
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
      }
    ],
    script: [
      {
        src: "https://code.jquery.com/jquery-3.3.1.slim.min.js",
        type: "text/javascript"
      },
      {
        src:
            "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
        type: "text/javascript"
      },
      {
        src:
            "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js",
        type: "text/javascript"
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#fff" },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '~assets/sass/app.scss', lang: 'scss' }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "./plugins/mixins/user.js",
    "./plugins/mixins/validation.js",

    '~plugins/env',
    '~plugins/event-bus',
    '~plugins/components-globally',
    '~plugins/i18n',
    '~plugins/axios',
    '~plugins/fontawesome',
    { src: '~plugins/bootstrap', mode: 'client' },
    '~plugins/vuetable-2',
    '~plugins/glyphicons',
    '~plugins/snotify',
    '~plugins/vue-ctk-date-time-picker',
    '~plugins/vue-draggable-nested-tree',
    '~plugins/emmet',
    '~plugins/vue-clipboard2',
    '~plugins/vue-slick',
    '~plugins/liquor-tree',
    '~plugins/vue-affix',
    '~plugins/v-markdown-editor',
    '~plugins/vue-tour',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['@nuxtjs/router', { path: path.join(__dirname, 'router'), fileName: 'routes.js' }],
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  //todo в plugins уже есть назначение базового пути!!!
  axios: {
    baseURL: process.env.API_URL || process.env.APP_URL + '/api'
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "login",
            method: "post",
            propertyName: "meta.token"
          },
          user: {
            url: "user",
            method: "get",
            propertyName: "data"
          },
          logout: {
            url: "logout",
            method: "post"
          }
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {},
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },
  }
}

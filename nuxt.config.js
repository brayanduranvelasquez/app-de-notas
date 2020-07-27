
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'Notas',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'author', name: 'author', content: 'Brayan Duran Velasquez' },
      { hid: 'description', name: 'description', content: 'App de notas, con operaciones basicas CRUD' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      
      { rel: 'stylesheet', href: '/css/font/font.css' },
      { rel: 'stylesheet', href: '/css/icons/css/all.css' },

      { rel: 'stylesheet', href: '/js/alertifyjs/alertify.min.css' },
      { rel: 'stylesheet', href: '/js/alertifyjs/bootstrap.min.css' } // Tema para alertifyjs
    ],
    script: [ 
      { src: '/js/alertifyjs/alertify.min.js' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@assets/scss/main.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js bar loading
  */
  loading: {
    color: "blue",
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  /*
  ** PWA
  ** 
  */
  pwa: {
    meta: {
      title: 'App de Notas',
      author: 'Brayan Duran Velasquez',
      description: 'Aplicacion para guardar sus notas',
      display: 'fullscreen'
    },
    manifest: {
      name: 'Aplicacion de Notas',
      short_name: 'App de Notas',
      lang: 'es',
    },
  }
}


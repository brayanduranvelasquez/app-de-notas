
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Nuxt Route
  **
  */
  router: {
    base: '/app-de-notas/'
  },
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
      { hid: 'description', name: 'description', content: 'Una aplicacion para guardar sus notas' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/app-de-notas/favicon.png' },
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@assets/scss/main.scss', // Estilos css
    '@assets/css/font/font.css', // tipografia
    '@assets/css/icons/css/all.css', // Iconos fontawesome
    
    'alertifyjs/build/css/alertify.min.css', // AlertifyJS
    'alertifyjs/build/css/themes/bootstrap.min.css' // Tema para AlertifyJS
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
    '@nuxtjs/pwa',
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
    '@nuxtjs/pwa',
  ],
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
      title: 'Notas',
      author: 'Brayan Duran Velasquez',
      description: 'Aplicacion para guardar sus notas',
    },
    manifest: {
      name: 'Mis notas',
      short_name: 'Mis notas',
      lang: 'es',
      display: 'standalone',
      theme_color: '#fff',
      background_color: '#fff'
    },
  }
}

export default {
    mode: 'universal',
    /*
    ** Headers of the page
    */
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
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },
    /*
    ** Global CSS
    */
    css: [
        '~/assets/custom.css'
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        // '@nuxtjs/eslint-module',
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://bootstrap-vue.js.org
        'bootstrap-vue/nuxt',
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        ['nuxt-fontawesome', {
            imports: [{
                set: '@fortawesome/free-solid-svg-icons',
                icons: ['fas']
            }, {
                set:'@fortawesome/free-brands-svg-icons',
                icons: ['fab']
            }]
        }]
    ],
    /*router: {
        extendRoutes (routes, resolve) {
            routes.push({
                name: 'albums_page',
                path: '/albums.html',
                component: resolve(__dirname, 'pages/albums.vue')
            }, {
                name: 'films_page',
                path: '/films.html',
                component: resolve(__dirname, 'pages/films.vue')
            }, {
                name: 'singers_page',
                path: '/singers.html',
                component: resolve(__dirname, 'pages/singers.vue')
            }, {
                name: 'singer_page',
                path: '/singer/:slug.html',
                component: resolve(__dirname, 'pages/singer/_slug.vue')
            })
        }
    },*/
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend (config, ctx) {
        }
    }
}

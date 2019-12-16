const path = require("path");
const merge = require("webpack-merge");
export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["iview/dist/styles/iview.css", "@/assets/stylus/reset.styl"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["@/plugins/iview"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */

  build: {
    extractCSS: { allChunks: true }, // css 独立打包 link 的形式加载
   
    loaders: {
      less: {
        javascriptEnabled: true
      }
    },
    // publicPath: '',
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.resolve = merge(config.resolve, {
        alias: {
          components: path.resolve(__dirname, "components"),
          assets: path.resolve(__dirname, "assets"),
          images: path.resolve(__dirname, "assets/images"),
          pages: path.resolve(__dirname, "pages"),
          http: path.resolve(__dirname, "http"),
          utils: path.resolve(__dirname, "utils"),
          store: path.resolve(__dirname, "store"),
          common: path.resolve(__dirname, "common")
        }
      });
    }
  }
};

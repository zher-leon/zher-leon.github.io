const path = require('path')
module.exports = {
  publicPath: './',
  lintOnSave: false,
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@utils": path.resolve(__dirname, "./src/static/utils"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@styles": path.resolve(__dirname, "./src/static/styles"),
        "@static": path.resolve(__dirname, "./src/static"),
        "@config": path.resolve(__dirname, "./src/config"),
        "@api": path.resolve(__dirname, "./src/api"),
        "@store": path.resolve(__dirname, "./src/store"),
        "@icons": path.resolve(__dirname, "./src/components/icon")
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  },
  // chainWebpack: config => {
  //   config.resolve.alias.set('@utils', path.resolve('./src/static/utils')); 
  //   config.resolve.alias.set('@components', path.resolve('./src/components')); 
  // },

}
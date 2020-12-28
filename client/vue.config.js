const WebpackBar = require("webpackbar")
module.exports = {
  // 是否为生产环境构建生成 source map？
  productionSourceMap: true,
  publicPath: './',
  outputDir: '../dist',
  assetsDir: 'static',
  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/webpack.md
  chainWebpack: () => { },
  configureWebpack: (config) => {
    return {
      plugins: [
        new WebpackBar({
          name: 'client',
          color: "green",
        }),
      ]
    }
  },
  devServer: {
    host: 'localhost', 
    port: 8080, 
    https: false,
    open: true,
    disableHostCheck: true,     
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // 三方插件的选项
  pluginOptions: {
    // ...
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "src/styles/mixins.scss";
          @import "src/styles/themes.scss";
          @import "src/styles/publish.scss";
        `
      }
    }
  },
}
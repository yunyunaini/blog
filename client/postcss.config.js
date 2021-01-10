module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: [
        "defaults",
        "ie >= 10",
        "last 2 versions",
        "> 0.2%",
        "iOS 7",
        "last 10 versions"
      ]
    },
    'postcss-pxtorem': {
      rootValue: 12,//结果为：设计稿元素尺寸/12
      propList: ['*']
    }
  }
}

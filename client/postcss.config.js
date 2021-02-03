module.exports = {
  // plugins: {
  //   'autoprefixer': {
  //     browsers: [
  //       "defaults",
  //       "ie >= 10",
  //       "last 2 versions",
  //       "> 0.2%",
  //       "iOS 7",
  //       "last 10 versions"
  //     ]
  //   }
  // }
  plugins: [
    require('autoprefixer')({ overrideBrowserslist: ['> 0.15% in CN'] })
  ]
}

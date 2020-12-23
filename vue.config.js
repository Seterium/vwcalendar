const webpack  = require('webpack')
const path = require('path')

module.exports = {
  outputDir: 'docs',
  publicPath: '/vwcalendar/',

  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ],
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js'
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'))

    config.optimization.delete('splitChunks')

    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')

    if (config.plugins.has('extract-css')) {
      const extractCSSPlugin = config.plugin('extract-css')
      extractCSSPlugin && extractCSSPlugin.tap(() => [{
        filename: '[name].css',
        chunkFilename: '[name].css'
      }])
    }
  },
  productionSourceMap: process.env.NODE_ENV !== 'production'
}
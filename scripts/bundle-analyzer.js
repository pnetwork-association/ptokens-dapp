process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpackConfigProd = require('react-scripts/config/webpack.config')('production')
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const green = _text => chalk.green.bold(_text)

webpackConfigProd.plugins.push(new BundleAnalyzerPlugin())

webpackConfigProd.plugins.push(
  new ProgressBarPlugin({
    format: `${green('analyzing...')} ${green('[:bar]')}${green('[:percent]')}${green('[:elapsed seconds]')} - :msg`,
  }),
)

console.log(webpackConfigProd)

delete webpackConfigProd.devtool
webpack(webpackConfigProd, (_err, _stats) => {
  if (_err || _stats.hasErrors()) {
    console.error(_err)
  }
})
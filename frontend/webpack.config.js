var debug = process.env.NODE_ENV !== 'production'
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var path = require('path')
var CopyWebppackPlugin = require('copy-webpack-plugin')

const config = {
  context: __dirname,
  entry:  [
    require.resolve('webpack-dev-server/client') + '?/',
    require.resolve('webpack/hot/dev-server'),
    './src/client.js'
  ],
  output: {
    path: __dirname + '/static/bundles/',
    filename: '[name]-[hash].js',
  },
  devtool: 'eval',
  devServer: {
    historyApiFallback: true,
    stats: { colors: true },
    hot: true,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BundleTracker({filename: './webpack-stats.json'})
  ],

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx']
  },
	
}

module.exports = config

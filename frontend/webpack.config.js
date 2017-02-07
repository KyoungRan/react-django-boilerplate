var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var path = require('path')

module.exports = {
  context: __dirname,
  entry: './src/client.js',
  output: {
    path: path.resolve('../backend/static/bundles/'),
    filename: '[name]-[hash].js'
  },

  plugins: [
    new BundleTracker({filename: './webpack-stats.json'})
  ],

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

  //    resolve: {
  //modulesDirectories: ['node_modules', 'bower_components'],
  //extensions: ['', '.js', '.jsx']
  //},
}

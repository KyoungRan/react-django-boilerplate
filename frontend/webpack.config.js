var debug = process.env.NODE_ENV !== 'production'
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')

const config = {
  context: __dirname,
  entry:  [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    path.join(__dirname, 'src/client.js')
  ],
  output: {
    path: __dirname + '/public/dist/',
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/frontend/public/dist/'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '/src/'),
    compress: true,
    host: 'localhost',
    port: 3000,
    noInfo: true,
    quite: false,
    historyApiFallback: true,
    hot: true,
    stats: {
      assets: false,
      colors: true,
      version: false,
      timings: false,
      chunks: false,
      chunkModules: false
    },
    publicPath: 'http://localhost:3000/frontend/public/dist'
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
      },
      {
        test: /\.css/,
        loader: [
          'style-loader?singleton',
          'css-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff?2|eot|ttf)$/i,
        loader: "file-loader?name=/public/icons/[name].[ext]"
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'public/images',
        to: 'images'
      },
      {
        from: 'public/css',
        to: 'css'
      }
    ]),
    new BundleTracker({filename: './webpack-stats.json'}),
    new webpack.optimize.UglifyJsPlugin({
      compress: process.env.NODE_ENV === 'production'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  resolve: {
    modules: [
      'node_modules',
      'public'
    ]
  }
}

module.exports = config

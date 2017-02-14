var debug = process.env.NODE_ENV !== 'production'
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  context: __dirname,
  entry:  [
    'webpack-dev-server/client?http://localhost:8080',  // WebpackDevServer host and port
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './src/client.js'
  ],
  output: {
    path: path.resolve('./public/dist/'),
    filename: '[name].bundle.js',
    publicPath: 'http://localhost:8080/public/dist/'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-2'],
          plugins: ['react-hot-loader/babel','react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    //new HtmlWebpackPlugin()
  ],
  resolve: {
    modules: [
      'node_modules',
      'public',
      'src',
      'public/dist/'
    ],
    extensions: ['.js', '.json', '.jsx', '.css']
  }
}

module.exports = config

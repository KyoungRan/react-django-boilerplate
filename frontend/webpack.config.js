var isDev = process.env.NODE_ENV !== 'production'
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  context: __dirname,
  entry: isDev? 
  [
    'webpack-dev-server/client?http://localhost:8080',  // WebpackDevServer host and port
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './src/client.js'
  ]:'./src/client.js',
  output: {
    path: path.resolve('./src/dist/'),
    filename: isDev? '[name].bundle.js' : '[name].bundle.min.js',
    publicPath: isDev? 'http://localhost:8080/' : '/'
  },
  devtool: isDev ? 'eval' : 'source-map',
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
  plugins: isDev ? 
  [
    new webpack.HotModuleReplacementPlugin(),
    new BundleTracker({filename: './webpack-stats.json'}),
  ] : 
  [
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets'
      },
      {
        from: 'src/styles',
        to: 'styles'
      }
    ]),
    new BundleTracker({filename: './webpack-stats-prod.json'}),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
    extensions: ['.js', '.json', '.jsx', '.css'],
    alias: {
      'assets': path.resolve(__dirname, '/src/assets/')
    },
  }
}

module.exports = config

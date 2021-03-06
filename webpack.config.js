var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var production = process.env.NODE_ENV === "production";

module.exports = {
  entry: [
    './src/index.jsx'
  ],
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  output: {
    filename: "app-[hash].js",
    path: __dirname + '/dist'
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dist/__library.json'),
      sourceType: 'var'
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/dist/__index.tmp',
      filename: 'index.html',
      inject: 'body'
    }),
    new CopyWebpackPlugin([
      { context: 'node_modules/bootstrap/dist/css/', from: '*.min.css', to: '.' },
      { from: 'node_modules/bootstrap/dist/fonts', to: './fonts' }
    ])
  ].concat(production ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    })
  ] : [])
};
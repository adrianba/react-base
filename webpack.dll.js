var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var outputPath = __dirname + '/dist';
var production = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    library:[
     'babel-polyfill',
     'react',
     'react-dom',
     'redux',
     'react-redux',
     'redux-thunk',
     'react-bootstrap'
    ],
  },
  output: {
    filename: '[name]-[hash].dll.js',
    path: outputPath,
    library: '[name]',
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
    }),
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]',
      libraryTarget: 'var',
      path: outputPath + '/__[name].json'
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: '__index.tmp',
      inject: 'body'
    })
  ].concat(production ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    })
  ] : [])
};
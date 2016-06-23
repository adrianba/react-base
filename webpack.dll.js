var webpack = require('webpack');
var outputPath = __dirname + '/dist';
var production = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    ReactLib:[
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
    filename: '[name].dll.js', 
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
      path: outputPath + '/[name].json' 
    })
  ].concat(production ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    })
  ] : [])
};
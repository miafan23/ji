var webpack = require('webpack');
// var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
// var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  context: __dirname + "/app",
  entry: './index.jsx',
  output: {
    filename: './dist/bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders:[
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015', 'react']
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" }
    ]
  },
  // plugins: [
  //   new CommonsChunkPlugin('init.js'),
  //   new OpenBrowserPlugin({ url: 'http://localhost:8080s' })
  // ]
};
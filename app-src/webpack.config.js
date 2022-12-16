

const path = require('path');
var webpack = require('webpack');

module.exports = {
  // experiments: {
  //   outputModule: true
  // },
  entry: path.join(__dirname, 'index.js'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    // module: true,
    // libraryTarget: 'esm',
  },

  devServer: {
    port: 8000,
    static: path.join(__dirname, 'public'),
    open: true
  },
  // resolve: {
  //   extensions: ['.js', '.jsx'],
  //   modules: ['node_modules'],
  // },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  }

};
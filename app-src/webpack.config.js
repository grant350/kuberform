const PATH = require('path');

module.exports = {
  entry: PATH.join(__dirname, 'index.js'),
  output: {
    path: PATH.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    port: 8000,
    static: PATH.join(__dirname, 'public'),
    open: true
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader']
      },
      {
        test: /\.(js|jsx|ts|tsx)$/i,
        loader: 'babel-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
};

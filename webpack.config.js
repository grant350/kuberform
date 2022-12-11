

const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'app-src'),
  entry: './index.js',
  output: {
    path: __dirname + '/app-dist',
    filename: './index.js',
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
  },
  externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'react-router': 'ReactRouter'
  }
};
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  module: {
      rules: [
        {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
    }]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true
  }
};
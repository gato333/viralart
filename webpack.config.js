const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = [{
  entry: ['./src/app.js','./src/styles.scss'],
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'build')
  },
  target: 'web',
  devtool: 'source-map',
  node: {
    __dirname: false,
    __filename: false,
  },
  stats: {
    colors: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'public')
        ],
        use: ['babel-loader']
      },
      // CSS Files
      {
          test: /\.scss$/,
          include: /scss/,
          use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      }
    ]
  },
  plugins: [
      new MiniCssExtractPlugin({
          filename: 'styles.css'
      })
  ]
},{
  entry: './src/server.js',
  output: {
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  target: 'node',
  devtool: 'source-map',
  plugins: [
    new webpack.IgnorePlugin(/^pg-native$/)
  ],
  stats: {
    colors: true
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'public')
        ],
        use: ['babel-loader']
      }
    ]
  }
}]

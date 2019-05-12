const HtmlWebPackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: __dirname + "/src/client/index.js",
  devtool: "cheap-source-map",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'client.bundle.js',
    publicPath: '',
    chunkFilename: '[id].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "html-loader"
        }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        use: [    
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]__[hash:64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => {
                autoprefixer({
                  'browsers': ['> 1%', 'last 2 versions']
                })
              }
            }
          },
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'url-loader?limit=8000&name=images/[name].[ext]'
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: __dirname + "/src/client/index.html",
      filename: "index.html",
      inject: "body"
    }),
  ]
};
const HtmlWebPackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
var nodeExternals = require('webpack-node-externals');
const path = require('path');

const clientConfig = {
  entry: __dirname + "/src/client/index.js",
  mode: "development",
  devtool: "cheap-eval-source-map",
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist/public'),
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
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        exclude: /(node_modules)/,
        use: {
          loader: "html-loader"
        }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
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
        exclude: /(node_modules)/,
        loader: 'url-loader?limit=8000&name=images/[name].[ext]'
      }
    ]
  },
  // plugins: [
  //   new HtmlWebPackPlugin({
  //     template: __dirname + "/src/client/index.html",
  //     filename: "index.html",
  //     inject: "body"
  //   })
  // ]
};

const serverConfig = {
  entry: __dirname + "/src/server/index.js",
  mode: "development",
  target: 'node',
  externals: [nodeExternals()],
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,   // if you don't put this is, __dirname
    __filename: false,  // and __filename return blank or /
  },
  devtool: "cheap-eval-source-map",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.bundle.js',
    publicPath: '',
    chunkFilename: '[id].js',
    globalObject: 'this'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        exclude: /(node_modules)/,
        use: {
          loader: "html-loader"
        }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: [    
          { loader: 'isomorphic-style-loader' },
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
        exclude: /(node_modules)/,
        loader: 'url-loader?limit=8000&name=images/[name].[ext]'
      }
    ]
  },
  // plugins: [
  //   new HtmlWebPackPlugin({
  //     template: __dirname + "/src/client/index.html",
  //     filename: "index.html",
  //     inject: "body"
  //   })
  // ]
};


module.exports = [clientConfig, serverConfig];
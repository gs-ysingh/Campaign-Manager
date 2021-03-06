const autoprefixer = require('autoprefixer');
var nodeExternals = require('webpack-node-externals');
const path = require('path');

const clientConfig = {
  entry: __dirname + "/src/client/index.js",
  mode: "production",
  devtool: "cheap-source-map",
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
};

const serverConfig = {
  entry: __dirname + "/src/server/index.js",
  mode: "production",
  target: 'node',
  externals: [nodeExternals()],
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,   // if you don't put this is, __dirname
    __filename: false,  // and __filename return blank or /
  },
  devtool: "cheap-source-map",
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
};

module.exports = [clientConfig, serverConfig];
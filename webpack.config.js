'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')

const webpackConfig = {
  entry: {
    index: './frontend/entries/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },

  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'frontend')],
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.sass$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [new VueLoaderPlugin()],

  stats: {
    colors: true
  }
}

const productionConfig = {
  mode: 'production'
}

const devConfig = {
  mode: 'development',
  plugins: [new webpack.HotModuleReplacementPlugin()],

  devtool: 'cheap-module-eval-source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  devServer: {
    host: '0.0.0.0',
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/dist/',
    hot: true
  }
}

module.exports = env => {
  if (env.NODE_ENV === 'production') {
    return merge(webpackConfig, productionConfig)
  }
  return merge(webpackConfig, devConfig)
}

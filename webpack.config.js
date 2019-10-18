'use strict';

const path = require('path');

const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const helpers = require('./config/helpers');


const APP_DIR = path.resolve(__dirname, "app");


module.exports = {
  entry: {
    'polyfills': path.resolve(APP_DIR, 'polyfills.ts'),
    'vendor': path.resolve(APP_DIR, 'vendor.ts'),
    'bootstrap': path.resolve(APP_DIR, 'bootstrap.ts'),
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('tsconfig.json') }
          },
          'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*$|$)/,
        loader: 'file-loader?name=../img/[name].[ext]'
      },
      {
        test: /\.(woff|woff2|ttf|eot)(\?.*$|$)/,
        loader: 'file-loader?name=../fonts/[name].[ext]'
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
    ],
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('./app'), // location of your src
      {} // a map of your routes
    ),

    // new webpack.optimize.CommonsChunkPlugin({
    //   name: ['bootstrap', 'app', 'vendor', 'polyfills']
    // }),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "../css/[name].css",
      chunkFilename: "[id].css"
    }),

    new webpack.LoaderOptionsPlugin({
      // test: /\.xxx$/, // may apply this only for some modules
      options: {
        htmlLoader: {
          // <a href=http://domain.com/>test</a> may get treated as a self-closing tag,
          //   with an unexpected </a> closing tag. So, we keep all attr quotes.
          removeAttributeQuotes: false,

          // ngIf is case-sensitive, and will not work if translated to ngif.
          // So, we keep original casing of attributes.
          caseSensitive: true,
        }
      }
    })
  ],

  output: {
    path: helpers.root('djdt_pev', 'static', 'pev_sql', 'js'),
    filename: '[name].js'
  }
};

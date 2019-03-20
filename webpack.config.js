const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const helpers = require('./config/helpers');


module.exports = {
  entry: {
    'polyfills': './app/polyfills.ts',
    'vendor': './app/vendor.ts',
    'app': './app/app.ts',
    'bootstrap': './app/bootstrap.ts',
    'styles': './app/assets/styles.css'
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
          } , 'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      // {
      //   test: /\.scss$/,
      //   use: [
      //       "style-loader", // creates style nodes from JS strings
      //       "css-loader", // translates CSS into CommonJS
      //       "sass-loader" // compiles Sass to CSS, using Node Sass by default
      //   ]
      // },

      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader"
        ]
      }
    ]
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
      filename: "[name].css",
      chunkFilename: "[id].css"
    })

  ],

  output: {
    path: helpers.root('djdt_pev', 'static', 'pev_sql', 'js'),
    filename: '[name].js'
  }
};

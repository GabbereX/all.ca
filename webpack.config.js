const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => ({
  context: path.resolve(__dirname, 'src'),

  entry: {
    scripts: './main.js',
  },

  output: {
    filename: '[name]_[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: './assets/[name]_[contenthash][ext]',
  },

  // resolve: {
  //   modules: ['./', 'node_modules'],
  // },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader',
      },

      {
        test: /\.scss$/i,
        use: [
          env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },

      {
        test: /\.(png|jpg|jpeg|webp|svg|gif|woff2?)$/i,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),

    new HTMLWebpackPlugin({
      template: './index.html',
    }),

    new MiniCssExtractPlugin({
      filename: 'styles_[contenthash].css',
    }),

    new FaviconsWebpackPlugin({
      logo: './favicon.svg',
      favicons: {
        icons: {
          coast: false,
          windows: false,
          appleIcon: false,
          appleStartup: false,
          android: false,
          yandex: false,
          firefox: false,
        },
      },
    }),
  ],

  devtool: !env.prod && 'source-map',

  devServer: {
    port: 5050,
    watchFiles: ['./src/*'],
  },
});

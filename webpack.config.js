const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

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

  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader',
      },

      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
      },

      {
        test: /\.(png|jpg|jpeg|gif|woff2?)$/i,
        type: 'asset/resource',
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

    new SpriteLoaderPlugin(),
  ],

  devtool: !env.prod && 'source-map',

  devServer: {
    port: 5050,
    watchFiles: ['./src/*'],
  },
});

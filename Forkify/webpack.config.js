const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, 'src/js/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js', //[name] name is the entry point bundle in this , [contentHash] for caching
    clean: true,
    assetModuleFilename: '[name][ext]', // To keep the same resource name after bundling
  },

  devtool: 'source-map', // Source-Map for finding Errors in bundle

  devServer: {
    //Development Server to auto-reload
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      // For SCSS
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      // FOR CSS in case we want for some reason
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      // For Babel
      {
        test: /\.js$/,
        exclude: /node_modules/, //Not in modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // For Resources
      {
        test: /\.(png|svg|jpg|jpeg|webp|avif|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: 'forkify // Search over 1,000,000 recipes',
      filename: 'index.html',
      template: 'src/template.html', //Template to send it to index.html
    }),
    new BundleAnalyzerPlugin(),
  ],
};

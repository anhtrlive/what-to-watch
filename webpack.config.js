const path = require(`path`);
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'production',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    },
    minimize: true,
    minimizer: [new TerserPlugin({ /* additional options here */ })],
  },
  entry: `./index.js`,
  output: {
    filename: `[name]bundle.js`,
    path: path.join(__dirname, `build`),
    publicPath: 'https://anhtrlive.github.io/what-to-watch/',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, `build`),
    compress: false,
    open: true,
    port: 1337,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      }
    ],
  },
  devtool: `source-map`,
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: "./img/favicon.ico"
    }),
    new HtmlWebpackPlugin({
      filename: '404.html',
      template: '../404.html'
    }),
    new MiniCssExtractPlugin({
      filename: `[name]style.css`,
    }),
    new CleanWebpackPlugin()
  ],
};

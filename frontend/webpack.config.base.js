const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'eval-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    port: 8080,
    host: 'localhost',
    allowedHosts: 'all',
    open: true, // open the default browser
    hot: true,
    historyApiFallback: true, // serve index.html instead of routes leading to no specific ressource
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      // emits a separate file and exports the URLs => works for import in JS and url in CSS
      // default condition: a file with size less than 8kb will be treated as a inline
      // module type and resource module type otherwise
      {
        test: /\.(png|jpg|gif|svg|mp3|mpe?g)$/,
        type: 'asset/resource',
      },

      /* automatically chooses between exporting a data URI and emitting a separate file.
      {
        test: /\.(png|jpg|gif|svg|mp3|mpe?g)$/,
        type : 'asset',
      },  */

      // in html file, emits files in output directory
      // and replace the src with the final path (to deal with svg, img...)
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, '../'),
    }),
    /* For more advanced use cases, these two global variables determine
    which renderer is included in the Phaser build. If you only want to run
    your game with WebGL, then you’d set WEBGL_RENDERER to true,
    and CANVAS_RENDERER to false.
    This way, your final code bundle would be smaller because all the canvas rendering
    code would be left out. */
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true),
    }),
    new ESLintPlugin(),
  ],
};

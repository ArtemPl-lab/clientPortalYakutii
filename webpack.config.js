const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // Входной файл
  entry: {
    index: './src/js/index',
  },
  // Выходной файл
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "./js/[name].js",
    library: '[name]'
  },

  module: {
    rules: [
      // Транспилируем js с babel
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },
      // Компилируем SCSS в CSS
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract css to separate file
          'css-loader', // translates CSS into CommonJS
          'postcss-loader', // parse CSS and add vendor prefixes to CSS rules
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
      // Подключаем шрифты из css
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './fonts',
              publicPath: '../fonts',
              name: '[name].[ext]'
            }
          },
        ]
      },
      // Подключаем картинки из css
      {
        test: /\.(svg|png|jpg|jpeg|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './img',
              publicPath: '../img',
              name: '[name].[ext]'
            }
          },
        ]
      },
    ],
  },
  plugins: [
    // Подключаем файл html, стили и скрипты встроятся автоматически
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: "index.html",
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: false,
      }
    }),

    // Копируем картинки
    new CopyWebpackPlugin([
      {
        from: './src/img',
        to: 'img',
      },
    ]),
    new CopyWebpackPlugin([
      {
        from: './src/fonts',
        to: 'fonts',
      },
    ]),
    // Кладем стили в отдельный файлик
    new MiniCssExtractPlugin({
      filename: './style/[name].css'
    }),
  ],
};

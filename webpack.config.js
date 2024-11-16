const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const path = require("path");

module.exports = {
  entry: "./src/index.js",

  output: {
    publicPath: "/",
    path: path.join(__dirname, "/app"),

    filename: "app.js",
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "app"),
    },
    compress: true,
    devMiddleware: {
      writeToDisk: true, // تفعيل الكتابة على القرص
    },
    port: 8081,
  },

  module: {
    rules: [
      {
        test: /\.html$/i,

        loader: "html-loader",
      },

      {
        test: /\.(sass|css|scss)$/,

        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },

      // {
      //   test: /\.(svg|eot|woff|woff2|ttf)$/,
      //   // من اجل لايتم تحزيم ملف صورة داخل مجلد الخطوط (وهذا قد يحدث في حال تشابهوا في الامتداد)
      //   exclude: /images/,

      //   use: [
      //     {
      //       loader: "file-loader",
      //       type: "asset/resource",

      //       options: {
      //         name: "[name].[ext]",

      //         outputPath: "assets/fonts",
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        // من اجل لايتم تحزيم ملف صورة داخل مجلد الخطوط (وهذا قد يحدث في حال تشابهوا في الامتداد)
        exclude: /images/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext]", // تحديد المجلد والاسم هنا
        },
      },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [
      `...`, // الموصى به لاحتفاظ بالأدوات الافتراضية
      new CssMinimizerPlugin(),
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",

      template: "./src/index.html",
    }),

    // new MiniCssExtractPlugin({
    //   filename: "[name].css",
    // }),

    // new OptimizeCSSAssetsPlugin({}),

    new MiniCssExtractPlugin({
      filename: "assets/css/style.css",
    }),
  ],
};

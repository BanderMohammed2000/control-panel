const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPartialsPlugin = require("html-webpack-partials-plugin");

const path = require("path");

module.exports = {
  entry: {
    app: "./src/index.js",
    //code splitting
    "assets/js/banner": "./src/assets/js/banner.js",
    "assets/js/tabs": "./src/assets/js/tabs.js",
    "assets/js/upload": "./src/assets/js/upload.js",
    "assets/js/chart": "./src/assets/js/chart.js",
  },

  output: {
    publicPath: "/",
    path: path.join(__dirname, "/app"),

    filename: "[name].js",
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
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
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

      // webpack 5 لايستخدم file-loader
      // البديل تحت الكود المعلق
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
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        exclude: /fonts/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext]", // تحديد المجلد والاسم هنا
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
      chunks: ["app", "assets/js/banner", "assets/js/chart", "assets/js/tabs"],
    }),

    new HtmlWebpackPlugin({
      filename: "add-product.html",
      template: "./src/add-product.html",
      chunks: ["app", "assets/js/upload"],
    }),

    new HtmlWebpackPlugin({
      filename: "add-user.html",
      template: "./src/add-user.html",
      chunks: ["app", "assets/js/upload"],
    }),

    new HtmlWebpackPlugin({
      filename: "products.html",
      template: "./src/products.html",
      chunks: ["app"],
    }),

    new HtmlWebpackPlugin({
      filename: "users.html",
      template: "./src/users.html",
      chunks: ["app"],
    }),

    new HtmlWebpackPlugin({
      filename: "orders.html",
      template: "./src/orders.html",
      chunks: ["app"],
    }),

    new HtmlWebpackPlugin({
      filename: "components/button.html",
      template: "./src/components/button.html",
      // بمعنى فقط راح يتم استدعاء ملف app.js داخل هذه الصفحة
      chunks: ["app"],
    }),

    new HtmlWebpackPlugin({
      filename: "components/textfield.html",
      template: "./src/components/textfield.html",
      chunks: ["app"],
    }),

    new HtmlWebpackPlugin({
      filename: "components/card.html",
      template: "./src/components/card.html",
      chunks: ["app"],
    }),

    new HtmlWebpackPlugin({
      filename: "components/banner.html",
      template: "./src/components/banner.html",
      chunks: ["app", "assets/js/banner"],
    }),

    new HtmlWebpackPlugin({
      filename: "components/list.html",
      template: "./src/components/list.html",
      chunks: ["app"],
    }),

    new HtmlWebpackPlugin({
      filename: "components/tabs.html",
      template: "./src/components/tabs.html",
      chunks: ["app", "assets/js/tabs"],
    }),

    new HtmlWebpackPlugin({
      filename: "components/upload.html",
      template: "./src/components/upload.html",
      chunks: ["app", "assets/js/upload"],
    }),

    new HtmlWebpackPlugin({
      filename: "components/help.html",
      template: "./src/components/help.html",
      chunks: ["app"],
    }),

    new HtmlWebpackPlugin({
      filename: "components/summary.html",
      template: "./src/components/summary.html",
      chunks: ["app"],
    }),

    new HtmlWebpackPlugin({
      filename: "components/actions.html",
      template: "./src/components/actions.html",
      chunks: ["app"],
    }),

    new HtmlWebpackPlugin({
      filename: "components/sidebar.html",
      template: "./src/components/sidebar.html",
      chunks: ["app"],
    }),

    new HtmlWebpackPlugin({
      filename: "components/table.html",
      template: "./src/components/table.html",
      chunks: ["app"],
    }),

    new HtmlWebpackPlugin({
      filename: "components/chart.html",
      template: "./src/components/chart.html",
      chunks: ["app", "assets/js/chart"],
    }),

    new HtmlWebpackPartialsPlugin({
      path: path.join(__dirname, "./src/components/help.html"),
      location: "help",
      template_filename: [
        "index.html",
        "add-product.html",
        "products.html",
        "users.html",
        "orders.html",
        "add-user.html",
      ],
    }),

    new HtmlWebpackPartialsPlugin({
      path: path.join(__dirname, "./src/components/banner.html"),
      location: "banner",
      template_filename: ["index.html"],
    }),
    new HtmlWebpackPartialsPlugin({
      path: path.join(__dirname, "./src/components/chart.html"),
      location: "chart",
      template_filename: ["index.html"],
    }),
    new HtmlWebpackPartialsPlugin({
      path: path.join(__dirname, "./src/components/sidebar.html"),
      location: "sidebar",
      template_filename: [
        "index.html",
        "add-product.html",
        "products.html",
        "users.html",
        "orders.html",
        "add-user.html",
      ],
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

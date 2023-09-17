const { DefinePlugin, SourceMapDevToolPlugin } = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dotenv = require("dotenv").config({ path: __dirname + "/.env" });
const isDevelopment = process.env.NODE_ENV !== "production";
const history = require("connect-history-api-fallback");

module.exports = {
  devtool: "eval-cheap-source-map",
  mode: process.env.NODE_ENV || "development",

  entry: {
    main: path.resolve(__dirname, "./src/index.js"),
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
  },

  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 7070,
    hot: true,
    open: true,
    historyApiFallback: true,
  },

  resolve: {
    extensions: [".*", ".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@components": path.resolve(__dirname, "src/components"),
      "@images": path.resolve(__dirname, "src/images"),
      "@public": path.resolve(__dirname, "public"),
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      title: "webpack Boilerplate",
      template: path.resolve(__dirname, "./public/index.html"),
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
    new DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed),
      "process.env.NODE_ENV": JSON.stringify(
        isDevelopment ? "development" : "production"
      ),
    }),
    new SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },

      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },

      {
        test: /\.(jpe?g|png|svg|webp|gif)$/i,
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
        type: "asset/resource",
      },

      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },

      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },

      {
        test: /\.m?js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },
  ignoreWarnings: [/Failed to parse source map/],
};

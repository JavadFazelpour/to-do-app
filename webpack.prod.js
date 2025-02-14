const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // For extracting CSS

module.exports = {
  mode: "production", // Important for production optimization
  entry: "./src/app.js",
  output: {
    filename: "bundle.[contenthash].js", // Add hash for cache busting
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "source-map", // Source maps for production debugging (but smaller)
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      // Extract CSS into separate files
      filename: "styles.[contenthash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // Use MiniCssExtractPlugin
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name].[hash][ext]",
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], // Extract SCSS too
      },
    ],
  },
  resolve: {
    extensions: [".js"],
    alias: {
      // Keep the same aliases
      "@models": path.resolve(__dirname, "src/models"),
      "@views": path.resolve(__dirname, "src/views"),
      "@controllers": path.resolve(__dirname, "src/controllers"),
      "@services": path.resolve(__dirname, "src/services"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@styles": path.resolve(__dirname, "src/styles"),
    },
  },
  optimization: {
    // Optimize for production
    minimize: true,
    minimizer: [
      // Add TerserPlugin for JS minification (included by default in production mode, but you can customize it here)
    ],
  },
};

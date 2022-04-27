const path = require("path");

const config = {
  entry: "./bin/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.(ts)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.node$/,
        loader: "node-loader",
      },
    ],
  },
  resolveLoader: {
    modules: [path.join(__dirname, "node_modules")],
  },
  resolve: {
    modules: [path.join(__dirname, "node_modules")],
    extensions: [".ts", ".js"],
    fallback: { tty: require.resolve("tty-browserify") },
  },
};

module.exports = () => config;

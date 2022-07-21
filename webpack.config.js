const glob = require("glob");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

const removeExtension = (path) => {
  return path.match(/(.+\/.+?).[a-z]+([?#;].*)?$/)[1];
}
const removeSrc = (path) => {
  return path.replace(/src\//, "")
}
// srcディレクトリと拡張子を消す
// ex: ./src/index.html -> ./index
const arrangePath = (fullPath) => {
  return removeSrc(removeExtension(fullPath));
}

const ejs_list = glob.sync("./src/**/[!_]*.ejs");
const entry_list = ejs_list.map((v) => [removeSrc(v), v])
const entry = Object.fromEntries(entry_list);

const html_list = ejs_list.map((v) => {
  return new HtmlWebpackPlugin({
    filename: arrangePath(v) + ".html",
    template: v,
    minify: true
  })
})

console.log(entry);

module.exports = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: [
          "html-loader",
          "template-ejs-loader"
        ],
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new RemoveEmptyScriptsPlugin({
      extensions: /\.(css|scss|sass|less|styl|ejs|html)([?].*)?$/,
      remove: /\.(js|mjs)$/
    }),
    ...html_list,
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
};

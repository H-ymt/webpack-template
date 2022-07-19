const glob = require("glob");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const TRASH_FILE_NAME = "TO_BE_TRASH.trash"

const ejs_list = glob.sync("./src/**/[!_]*.ejs");
const ejs_entry = ejs_list.map((v) => {
  return [TRASH_FILE_NAME, v];
});
const entry = Object.fromEntries(ejs_entry);

module.exports = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]",
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: [
          "html-loader",
          "ejs-html-loader"
        ],
      },
    ],
  },
  plugins: [
    new RemoveEmptyScriptsPlugin({
      extensions: /\.(css|scss|sass|less|styl|ejs|html)([?].*)?$/,
      remove: /\.(js|mjs|trash)$/
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.ejs',
      minify: true
    })
  ],
};

const glob = require("glob");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ejs_list = glob.sync("./src/**/[!_]*.ejs");
const ejs_entry = ejs_list.map((v) => {
  const without_extension = v.match("(.+/.+?).[a-z]+([?#;].*)?$")[1];
  return [without_extension + ".html", v];
});
const entry = Object.fromEntries(ejs_entry);

console.log(entry);

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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.ejs',
      minify: false,
    })
  ]
};

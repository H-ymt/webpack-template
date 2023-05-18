## 概要

Webpack で FLOCSS × Sass のコーディングをするためのスターターキット。

## 環境

- node 18.16.0

## Webpack の機能

webpack.config.js に書いている機能としては大体以下の機能。

- webpack で ejs を html に変換する
- フッターやヘッダーなどの共通部分を include で読み込む
- sass を css に変換する

## 環境構築

1. コーディングしたいディレクトリに `cd` コマンドで移動。

2. GitHub のリポジトリをローカルにクローンする。

```
git clone https://github.com/Handai-Yamato/webpack-template
```

3. webpack や webpack を動かすのに必要なプラグインをインストールする。

```
npm install
```

4. dist フォルダに開発用のビルドされたファイルを生成する。

```
npm run dev
```

5. Web サーバーを起動する。ファイルを編集すると自動でリロードされる。

```
npm run watch
```

6. `npm run build` を実行することで dist フォルダに本番用にビルドされたファイルが生成される

```
npm run build
```

## 留意事項

### 静的ファイル(ejs, sass, js 以外)は全て public フォルダに置く

画像やフォントなど webpack で変換が不要なものは public に配置する。  
 CopyWebpackPlugin が public ディレクトリをまるごと dist にコピーしているため。  
 `<img src="/sample.png"/>`のようにできれば絶対パスで記述する。

### テンプレートはファイル名先頭に\_をつける

拡張子が ejs のファイルは全て webpack のエントリーポイントになるが、  
アンダーバー\_ をファイル名の先頭につけることで例外になる。  
例えば共通フッターを\_footer.ejs ではなく footer.ejs のファイル名にすると footer.html というファイルが作成されてしまう。

## 参考

[Webpack]ejs を html に変換時、include と sass と画像を利用する  
 https://kajindowsxp.com/webpack-ejs-to-html/

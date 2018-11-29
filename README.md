# yasuda-computer-club.org

> YASUDA GAKUEN Computer Club&#39;s Website

[Nuxt.js](https://nuxtjs.org) でできています。

## 開発

クローンしたらまずは以下のコマンドを実行してください。

```bash
$ npm install
```

開発用サーバーを立ち上げるには以下のコマンドを実行します。

```bash
$ npm run dev
```

起動したらブラウザで localhost:3000 にアクセスします。ファイル変更を監視してホットリロードが走るので基本的にF5を押す必要はありません。

### ESLintに怒られたら

```bash
npm run list:fix
```

を実行すれば自動で直してくれます。

### ページを追加する

**pages/** ディレクトリに拡張子 ***.vue** でファイルを作成します。**about.vue** を参考に変更すべき箇所を変更すれば新しいページが作れます。markdownは **contents/** ディレクトリに入っています。`require` や `import` した場合は markdown-loader, highlight-loader, html-loader を介してHTMLに変換、コードのシンタックスハイライト、画像の埋め込みなどがされたHTMLが手に入りますので、`v-html` 属性で要素に流し込んでください。

**また、ページを作成・更新するときはブランチを切っていただくようお願いします。**

## サーバーにアップ

レンタルサーバーにアップするときは以下のコマンドを実行し、distディレクトリの中をサーバーにアップします。

```bash
$ npm run generate
```

# react-template

## 目次
- [概要](#概要)
- [使用技術](#使用技術)
- [セットアップ方法](#セットアップ方法)
- [ファイル構成](#ファイル構成)
- [ルール](#ルール)
- [ライセンス](#ライセンス)

## 概要
<p align="center">
  <img src="./settings/screenshots/ja.png" width="70%">
</p>

- このプロジェクトはReactなどの最先端技術で作られているモダンでおしゃれなテンプレートです。

## 使用技術
- メイン
  - React
  - TypeScript
- デザイン
  - Tailwind CSS
  - Storybook
  - Shadcn UI
    - Radix UIを使用
- アニメーション
  - Framer Motion
  - react-type-animation
    - タイピングアニメーション
- アイコン
  - React Icons
  - Lucide React
- ライブラリ
  - Zustand
  - i18next
  - react-firebase-hooks
    - FirebaseをReactのHooksで簡単に使えるライブラリです
- ルーター
  - react-router-dom
  - Generouted
    - `pages`から自動作成するライブラリ
- サービス
  - Cloudflare
    - Pages
    - Registrar
      - 必要な方は使用してください。
  - Firebase
    - Authentication
    - Firestore
    - Storage
    - Functions
    - Emulator

## セットアップ方法
- Node.js、Java、プロジェクト依存のインストール
  - こちらは省略させていただきます
  - JavaはFirebase emulatorを起動するため必要です。

- Firebaseプロジェクトの作成
  - `Firebase Console`にアクセスしてプロジェクトを作成してください。
  - `Blazeプラン`にしてください。
  - AuthenticationでEmail、Google、匿名のログインを有効にしてください。
  - Firestore、Functions、Storageの場所設定を使用される地域周辺に設定してください。
  - 環境変数をメモしておいてください。
    - VAP IDキーも必要です

- Firebase CLIにログイン
  - `npm install -g firebase-tools`でFirebase CLIをインストールしてください。
  - `firebase login`でプロジェクトを作成したアカウントでログインしてください。

- scripts/secret.jsonの設定
  - Firebase Consoleで`プロジェクトの設定/サービスアカウント`に移動してください。
  - `Firebase Admin SDK`から新しい秘密鍵を作成して、ダウンロードしたJSONの名前を`secret.json`に変更して`functions/src`配下に配置してください。

- その他手作業で変更する部分
  - デザイン系
    - `public/files/icons/icon.svg`を任意のsvgファイルに置き換えてください。
    - `src/index.css`のprimaryのCSS変数を任意の色に変更してください。
      - ダークモードも変更してください。

- セットアップコマンドの実行
  - `npm run setup`で`Normal setup`を選んで画面の通りに必要事項を入力してください。

- 開発時
  - `Firebase Emulator`は初期化が必要なので同じく`npm run setup`で`Emulator setup`を選択して初期化をしてください。
    - 管理者権限を追加するときは`Admin role setup`を選択してください。

- デプロイ
  - Cloudflare pagesだと簡単にデプロイが可能です。
    - こちらも説明を省かせてもらいます

## ファイル構成
- ほぼすべてのファイルは最初にコメントで説明されています。
- `index`とついた名前のファイルは基本的に何かのメインファイルになっています。

## ルール
- [コードルール](./projectSettings/docs/codeRule.md)
- [デザインルール](./projectSettings/docs/designRule.md)

## ライセンス
- このプロジェクトはMIT Licenseのもとで公開されています。

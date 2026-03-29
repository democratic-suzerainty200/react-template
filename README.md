# react-template

## 目次
- [概要](#概要)
- [使用技術](#使用技術)
- [セットアップ方法](#セットアップ方法)
- [ファイル構成](#ファイル構成)
- [ライセンス](#ライセンス)
- [ルール](#ルール)

## 概要
<p align="center">
  <img src="./settings/screenshots/ja.png" width="70%">
</p>

- このプロジェクトはフルスタックエンジニアがよく使う技術を使用したReactでできているテンプレートです。

## 使用技術
- 以下は使用する技術を書いています。
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
    - FirebaseをReactのHooksで簡単に使えるもの
- ルーター
  - react-router-dom
  - Generouted
    - `pages`から自動作成するライブラリ
- サービス
  - Sentry
  - Cloudflare
    - Pages
    - Registrar
  - Firebase
    - Authentication
    - Firestore
    - Storage
    - Functions
    - Emulator

## セットアップ方法
- Node.js、Java、プロジェクト依存のインストール
  - こちらは省略させていただきます
  - Javaは`Firebase emulator`を起動するため必要です。

- Firebaseプロジェクトの作成
  - `Firebase Console`にアクセスしてプロジェクトを作成してください。
  - `Blazeプラン`にしてください。
  - AuthenticationでEmail、Google、匿名のログインを有効にしてください。

- Firebase CLIにログイン
  - `npm install -g firebase-tools`で`Firebase CLI`をインストールしてください。
  - `firebase login`でプロジェクトを作成したアカウントでログインしてください。

- scripts/secret.jsonの設定
  - `Firebase Console`で`プロジェクトの設定`の`サービスアカウント`に移動してください。
  - `Firebase Admin SDK`の`新しい秘密鍵を作成`を押してダウンロードしたJSONの名前を`secret.json`に変更して`functions/src`配下に配置してください。

- セットアップコマンドの実行
  - `npm run setup`で`Normal setup`を選んで画面の通りに必要事項を入力してください。

- 開発時
  - `Firebase Emulator`は初期化が必要なので同じく`npm run setup`で`Only emulator`を選択して初期化をしてください。

- デプロイ
  - GitHubにプロジェクトを公開してください。
  - `Cloudflare Pages`にGitHub経由でリポジトリを接続して下さい。
    - フレームワークは`React(Vite)`を選択して環境変数も記入してください。

## ファイル構成
- ほぼすべてのファイルは一行目のコメントで説明してます。
- 説明不要なファイルは省かせていただきます。
- コメントできないファイルは以下に説明をまとめておきます。
  - indexとついたファイル
    - 基本的に何かのメインファイルです。
  - functions/src/secret.json
    - `secret.json`のコピーです。
    - セットアップスクリプトと`Firebase Functions`が使います。

## ライセンス
- このプロジェクトはMIT Licenseのもとで公開されています。

## ルール
- [コードルール](./projectSettings/docs/codeRule.md)
- [デザインルール](./projectSettings/docs/designRule.md)
- [GitHubルール](./projectSettings/docs/githubRule.md)

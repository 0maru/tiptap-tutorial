# tiptap-tutorial

このチュートリアルをやるには18以降のNode.js が必要です。

ターミナル端末で下記のコマンドを実行してNode.js のバージョンを確認してください。

```shell
node -v
```

## 手順

### 1. ディレクトリの作成

```
mkdir tiptap-tutorial
```

### 2. プロジェクトの作成

```
npx create-remix@latest .
```

選択肢は以下の通り

Initialize a new git repository? (recommended)  
Yes

Install dependencies with npm? (recommended)
Yes

```
> npx create-remix@latest .

 remix   v2.9.2 💿 Let's build a better website...
      ◼  Directory: Using . as project directory

      ◼  Using basic template See https://remix.run/guides/templates for more
      ✔  Template copied
   git   Initialize a new git repository? (recommended)
         ● Yes  ○ No

  deps   Install dependencies with npm? (recommended)
         ● Yes  ○ No

      ✔  Dependencies installed

      ✔  Git initialized
  
  done   That's it!
         Check out README.md for development and deploy instructions.

         Join the community at https://rmx.as/discord
```

### 3. radix-ui/themes のインストール

radix-ui/themes はコンポーネントライブラリ
スタイルまで提供されているのでいわゆるradix-ui/themes っぽいデザインになる
Bootstrap や Vuetify のような感じ

themes の他にprimitives というライブラリも提供されていて、 radix-ui/primitives を使うと、
css のあたってないコンポーネントを使用することができる。
スタイルを当てるのはcss やtailwindcss などを使うとよい
もともとのスタイルもないので、魔改造になることもなく独自のコンポーネントを定義しやすく、機能やアクセシビリティのみを提供したHeadless UIライブラリ。

今回はCSSは書かない方針なので、themes を採用した。

https://www.radix-ui.com/

```
npm install @radix-ui/themes
```

root.tsx に css を追加する

```tsx
import '@radix-ui/themes/styles.css';
```

### 4. 実行する

```shell
npm run dev
```

### 5. tiptap のインストール

```shell
npm install @tiptap/react @tiptap/starter-kit
```

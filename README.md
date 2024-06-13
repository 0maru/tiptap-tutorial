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
npm install @radix-ui/themes @primer/octicons-react
```

root.tsx に css を追加する

```tsx
import '@radix-ui/themes/styles.css';
```

root.tsx の `{children}` を`<Theme>` で囲み、ファイルの先頭に `'use client'` を追加する

```tsx
'use client'

import { Links, Meta, Outlet, Scripts, ScrollRestoration, } from '@remix-run/react'
import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'


export function Layout({children} : { children : React.ReactNode }) {
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body>
    <Theme>
      {children}
    </Theme>
    <ScrollRestoration />
    <Scripts />
    </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
```

### 4. 実行する

```shell
npm run dev
```

### 5. tiptap のインストール

```shell
npm install @tiptap/react @tiptap/starter-kit
```

### 6. tiptap を埋め込む

app の下に `components` ディレクトリを作成し、その中に `CustomEditor.tsx` を作成する

```shell
mkdir app/components
touch app/components/CustomEditor.tsx
```

```tsx
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'

const CustomEditor = () => {
  const editor = useEditor(
    {
      extensions: [StarterKit]
    }
  )
  return (
    <EditorContent editor={editor} />
  )
}

export default CustomEditor
```

### 7. ブラウザで確認する

ただのテキストボックスがあることが確認できる

### 8. プレビューできるようにする

エディターとなるべきコンポーネントの横に、エディターに入力している内容をリアルタイムで表示できるプレビューコンポーネントを作成する
tiptap は入力したテキストをHTMLの形式で扱うことができるので、HTML形式とテキスト形式のプレビューを作成する

```tsx
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Box, Flex } from '@radix-ui/themes'

const CustomEditor = () => {
  const editor = useEditor(
    {
      extensions: [StarterKit]
    }
  )
  return (
    <Flex direction={'row'} gap="2">
      <Box minWidth={'50vw'}>
        <EditorContent editor={editor} />
      </Box>
      <Box minWidth={'50vw'}>
        <p>プレビュー（HTML）</p>
        <div>{editor?.getHTML()}</div>
        <p>プレビュー（テキスト）</p>
        <div>{editor?.getText()}</div>
      </Box>
    </Flex>
  )
}

export default CustomEditor
```

### 9. getHTML() で取得した内容をHTMLのタグを反映してプレビューする

```tsx
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Box, Flex } from '@radix-ui/themes'

const CustomEditor = () => {
  const editor = useEditor(
    {
      extensions: [StarterKit]
    }
  )
  return (
    <Flex direction={'row'} gap="2">
      <Box minWidth={'50vw'}>
        <EditorContent editor={editor} />
      </Box>
      <Box minWidth={'50vw'}>
        <p>プレビュー（HTML）</p>
        <div>{editor?.getHTML()}</div>
        {editor && (
          <div dangerouslySetInnerHTML={{__html: editor!.getHTML()}} />
        )}
        <p>プレビュー（テキスト）</p>
        <div>{editor?.getText()}</div>
      </Box>
    </Flex>
  )
}

export default CustomEditor
```

### 10. HTMLを装飾する機能を実装する

太字（Bold）や斜体（Italic）などの装飾機能を実装する

#### 10-1. Toolbar.tsx を作成する

```shell
touch app/components/Toolbar.tsx
```

#### 10-2. Toolbar.tsx を実装する

```tsx
import {Box, Button} from '@radix-ui/themes'
import {Editor} from '@tiptap/react'
import {BoldIcon, ItalicIcon, ListOrderedIcon, ListUnorderedIcon, StrikethroughIcon} from '@primer/octicons-react'

const Toolbar = ({editor}: { editor: Editor }) => {
  return (
    <Box>
      {/*テキストを太字にするボタン*/}
      <Button onClick={editor.commands.setBold}>
        <BoldIcon/>
      </Button>
      {/*テキストを斜体にするボタン*/}
      <Button onClick={editor.commands.setItalic}>
        <ItalicIcon/>
      </Button>
      {/*テキストに打ち消し線を追加するボタン*/}
      <Button onClick={editor.commands.setStrike}>
        <StrikethroughIcon/>
      </Button>
      {/*リスト表記にするボタン*/}
      <Button onClick={editor.chain().focus().toggleBulletList().run}>
        <ListUnorderedIcon/>
      </Button>
      {/*数字付きのリスト表記にするボタン*/}
      <Button onClick={editor.chain().focus().toggleOrderedList().run}>
        <ListOrderedIcon/>
      </Button>
    </Box>
  )
}

export default Toolbar
```

### 10-3. _index.tsx に Toolbar を埋め込む

```tsx
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Box, Flex } from '@radix-ui/themes'
import Toolbar from '~/components/Toolbar'

const CustomEditor = () => {
  const editor = useEditor(
    {
      extensions: [StarterKit]
    }
  )
  return (
    <Flex direction={'row'} gap="2">
      <Box minWidth={'50vw'}>
        <EditorContent editor={editor} />
        {editor && (
          <Toolbar editor={editor} />
        )}
      </Box>
      <Box minWidth={'50vw'}>
        <p>プレビュー（HTML）</p>
        <div>{editor?.getHTML()}</div>
        {editor && (
          <div dangerouslySetInnerHTML={{__html: editor!.getHTML()}} />
        )}
        <p>プレビュー（テキスト）</p>
        <div>{editor?.getText()}</div>
      </Box>
    </Flex>
  )
}

export default CustomEditor
```

テキストを入力して、太字や斜体、打ち消し線を適用できることが確認できる

## 12. 引用とコードブロックを追加する

Toolbar.tsx に引用とコードブロックの機能を追加する

```

```

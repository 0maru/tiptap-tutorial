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

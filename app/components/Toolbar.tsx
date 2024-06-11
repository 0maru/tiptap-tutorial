import { Box, Button } from '@radix-ui/themes'
import { FontBoldIcon, FontItalicIcon, StrikethroughIcon, } from '@radix-ui/react-icons'
import { Editor } from '@tiptap/react'

const Toolbar = ({editor} : { editor : Editor }) => {
  return (
    <Box>
      {/*テキストを太字にするボタン*/}
      <Button onClick={editor.commands.setBold}>
        <FontBoldIcon />
      </Button>
      {/*テキストを斜体にするボタン*/}
      <Button onClick={editor.commands.setItalic}>
        <FontItalicIcon />
      </Button>
      {/*テキストに打ち消し線を追加するボタン*/}
      <Button onClick={editor.commands.setStrike}>
        <StrikethroughIcon />
      </Button>
    </Box>
  )
}

export default Toolbar

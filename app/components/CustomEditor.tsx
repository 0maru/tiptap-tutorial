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

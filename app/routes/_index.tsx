import type { MetaFunction } from '@remix-run/node'
import CustomEditor from '~/components/CustomEditor'
import { Box } from '@radix-ui/themes'

export const meta : MetaFunction = () => {
  return [
    {title: 'New Remix App'},
    {name: 'description', content: 'Welcome to Remix!'},
  ]
}

export default function Index() {

  return (
    <main>
      <Box>
        <CustomEditor />
      </Box>
    </main>
  )
}

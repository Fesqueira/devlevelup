/* eslint-env node */
import { spawn } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const envPath = join(here, '..', '..', '.env')
const raw = readFileSync(envPath, 'utf8')
const match = raw.match(/^FIGMAKEY=(.+)$/m)
const key = match ? match[1].trim().replace(/^['"]|['"]$/g, '') : ''

const child = spawn(
  'npx',
  ['-y', 'figma-developer-mcp', `--figma-api-key=${key}`, '--stdio'],
  {
    stdio: 'inherit',
    cwd: join(here, '..', '..'),
    shell: process.platform === 'win32',
  },
)

child.on('error', (err) => {
  console.error('[figma-mcp] falha ao iniciar:', err)
  process.exit(1)
})

child.on('exit', (code) => {
  process.exit(code ?? 0)
})

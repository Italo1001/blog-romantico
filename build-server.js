// scripts/build-server.js
import { build } from 'esbuild'

build({
  entryPoints: ['server/index.ts'],
  platform: 'node',
  format: 'esm',
  bundle: true,
  outdir: 'dist',
  packages: 'external',
}).catch((err) => {
  console.error(err)
  process.exit(1)
})

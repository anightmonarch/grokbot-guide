// Step 1 — hash every file in dist and write the Direct Upload manifest + payload.
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { DIST, WORK } from './config.mjs'

const TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.xsl': 'application/xml',
  '.txt': 'text/plain',
  '.woff2': 'font/woff2',
}

if (!fs.existsSync(DIST)) {
  console.error(`dist not found: ${DIST} — run \`pnpm docs:build\` first`)
  process.exit(1)
}
fs.mkdirSync(WORK, { recursive: true })

const files = []
;(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f)
    if (fs.statSync(p).isDirectory()) walk(p)
    else files.push(p)
  }
})(DIST)

const manifest = {}
const payload = []
for (const f of files) {
  const value = fs.readFileSync(f).toString('base64')
  const ext = path.extname(f)
  const key = crypto.createHash('sha256').update(value + ext.slice(1)).digest('hex').slice(0, 32)
  manifest['/' + path.relative(DIST, f).split(path.sep).join('/')] = key
  payload.push({ key, value, base64: true, metadata: { contentType: TYPES[ext] || 'application/octet-stream' } })
}

fs.writeFileSync(path.join(WORK, 'manifest.json'), JSON.stringify(manifest))
fs.writeFileSync(path.join(WORK, 'payload.json'), JSON.stringify(payload))
console.log(JSON.stringify({ files: files.length, work: WORK }))

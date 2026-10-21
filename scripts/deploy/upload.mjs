// Step 2 — upload missing assets with a short-lived Pages upload JWT.
// Get it from GET /accounts/{account_id}/pages/projects/grokbotguide/upload-token
// (e.g. through the Cloudflare MCP `execute` tool) and pass it as CF_UPLOAD_JWT.
import fs from 'node:fs'
import path from 'node:path'
import { WORK } from './config.mjs'

const JWT = process.env.CF_UPLOAD_JWT
if (!JWT) {
  console.error('missing CF_UPLOAD_JWT')
  process.exit(1)
}
const API = 'https://api.cloudflare.com/client/v4'
const H = { Authorization: `Bearer ${JWT}`, 'Content-Type': 'application/json' }
const post = async (p, body) => (await fetch(API + p, { method: 'POST', headers: H, body: JSON.stringify(body) })).json()

const payload = JSON.parse(fs.readFileSync(path.join(WORK, 'payload.json'), 'utf8'))
const hashes = payload.map((a) => a.key)

const cm = await post('/pages/assets/check-missing', { hashes })
if (!cm.success) {
  console.error('check-missing failed', JSON.stringify(cm.errors))
  process.exit(1)
}
const missing = new Set(cm.result)
const todo = payload.filter((a) => missing.has(a.key))
console.log(`missing ${todo.length} of ${payload.length}`)

for (let i = 0; i < todo.length; i += 20) {
  const r = await post('/pages/assets/upload', todo.slice(i, i + 20))
  if (!r.success) {
    console.error('upload failed at', i, JSON.stringify(r.errors))
    process.exit(1)
  }
}
const uh = await post('/pages/assets/upsert-hashes', { hashes })
if (!uh.success) {
  console.error('upsert-hashes failed', JSON.stringify(uh.errors))
  process.exit(1)
}
console.log(JSON.stringify({ uploaded: todo.length, total: payload.length }))

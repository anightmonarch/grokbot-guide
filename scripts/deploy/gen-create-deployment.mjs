// Step 3 — emit the async function that creates the deployment from the manifest.
// Run the generated .deploy/create-deployment.js with the Cloudflare MCP `execute`
// tool (it provides `cloudflare.request` and `accountId`).
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { BRANCH, PROJECT, ROOT, WORK } from './config.mjs'

const manifest = fs.readFileSync(path.join(WORK, 'manifest.json'), 'utf8')
const git = (c) => {
  try {
    return execSync(`git ${c}`, { cwd: ROOT }).toString().trim()
  } catch {
    return ''
  }
}
const sha = process.env.SHA || git('rev-parse HEAD')
const msg = process.env.MSG || git('log -1 --pretty=%s') || 'deploy'
const dirty = git('status --porcelain') ? 'true' : 'false'
const boundary = `----cfpages${Date.now()}`
const parts = [
  ['manifest', manifest],
  ['branch', BRANCH],
  ['commit_hash', sha],
  ['commit_message', msg],
  ['commit_dirty', dirty],
]
const code = `async () => {
  const b = ${JSON.stringify(boundary)};
  const parts = ${JSON.stringify(parts)};
  let body = parts.map(([k, v]) => '--' + b + '\\r\\nContent-Disposition: form-data; name="' + k + '"\\r\\n\\r\\n' + v + '\\r\\n').join('');
  body += '--' + b + '--\\r\\n';
  const d = await cloudflare.request({
    method: 'POST',
    path: '/accounts/' + accountId + '/pages/projects/${PROJECT}/deployments',
    body,
    contentType: 'multipart/form-data; boundary=' + b,
    rawBody: true,
  });
  return { id: d.result.id, url: d.result.url, env: d.result.environment, stage: d.result.latest_stage, aliases: d.result.aliases };
}`
const out = path.join(WORK, 'create-deployment.js')
fs.writeFileSync(out, code)
console.log(JSON.stringify({ project: PROJECT, branch: BRANCH, sha: sha.slice(0, 7), dirty, out }))

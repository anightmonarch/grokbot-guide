// Regenerates docs/.vuepress/public/{favicon,logo}.svg from the BotMark geometry.
// Usage: node scripts/gen-favicon.mjs   (bundles geometry.ts with the esbuild that ships with vite)
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const fromRoot = createRequire(path.join(root, 'package.json'))
const fromBundler = createRequire(fromRoot.resolve('@vuepress/bundler-vite'))
const req = createRequire(fromBundler.resolve('vite'))
const esbuild = req.resolve('esbuild/bin/esbuild')
const out = path.join(root, 'node_modules/.cache/botmark-geometry.mjs')
fs.mkdirSync(path.dirname(out), { recursive: true })
execFileSync(esbuild, [path.join(root, 'docs/.vuepress/theme/botmark/geometry.ts'), '--format=esm', `--outfile=${out}`, '--log-level=warning'])
const G = await import(pathToFileURL(out).href)

// favicon: black site mark, xs eye proportions (thicker strokes survive 16 px)
const svg = G.staticSvg('blob', '#0A0A0A', '#FFFFFF', 16).replace(' width="16" height="16"', '')
for (const name of ['favicon.svg', 'logo.svg']) {
  fs.writeFileSync(path.join(root, 'docs/.vuepress/public', name), svg + '\n')
}
console.log('wrote favicon.svg + logo.svg', svg.length, 'bytes')

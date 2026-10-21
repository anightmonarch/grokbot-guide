// Cloudflare Pages deploy settings. The project name is fixed on purpose:
// production lives on `grokbotguide` (https://grokbotguide.pages.dev).
// Never point this at the retired `grokbot-guide` project.
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const PROJECT = 'grokbotguide'
export const BRANCH = 'main'
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
export const DIST = path.join(ROOT, 'docs/.vuepress/dist')
export const WORK = path.join(ROOT, '.deploy')

if (PROJECT !== 'grokbotguide') throw new Error(`refusing to deploy to ${PROJECT}`)

import type { Plugin, Theme } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'
import { markdownContainerPlugin } from '@vuepress/plugin-markdown-container'
import { readingTimePlugin } from '@vuepress/plugin-reading-time'
import { seoPlugin } from '@vuepress/plugin-seo'
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'
import { sitemapPlugin } from '@vuepress/plugin-sitemap'

const __dirname = getDirname(import.meta.url)

/**
 * VuePress keeps the markdown outline (`page.headers`) on the node side only.
 * Copy it into the page data so `page.value.headers` is available on the
 * client and the in-page table of contents can be rendered.
 */
const headersPlugin: Plugin = {
  name: 'grok-headers',
  onInitialized(app) {
    app.pages.forEach((page) => {
      if (page.headers) page.data.headers = page.headers
    })
  },
}

const escapeHtml = (text: string): string =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

type MdToken = { info: string; nesting: number }
type MdRender = (
  tokens: MdToken[],
  index: number,
  options?: unknown,
  env?: unknown,
  self?: unknown,
) => string

const containerTitle = (tokens: MdToken[], index: number, type: string, fallback: string): string => {
  const info = tokens[index].info.trim().slice(type.length).trim()
  return escapeHtml(info || fallback)
}

const renderSource: MdRender = (tokens, index) => {
  if (tokens[index].nesting === 1) {
    return `<div class="g-source"><strong>${containerTitle(tokens, index, 'source', '事实来源')}</strong>\n`
  }
  return '</div>\n'
}

const renderApproval: MdRender = (tokens, index) => {
  if (tokens[index].nesting === 1) {
    const label = containerTitle(tokens, index, 'approval', '审批')
    return `<div class="g-approval"><span class="chip">${label}</span><div>\n`
  }
  return '</div>\n</div>\n'
}

const renderExample: MdRender = (tokens, index) => {
  if (tokens[index].nesting === 1) {
    return `<div class="g-example"><div class="t">${containerTitle(tokens, index, 'example', '示例')}</div>\n`
  }
  return '</div>\n'
}

const renderTodo: MdRender = (tokens, index) => {
  if (tokens[index].nesting === 1) {
    const label = containerTitle(tokens, index, 'todo', '待核实')
    return `<div class="g-todo"><span class="chip">${label}</span><div>\n`
  }
  return '</div>\n</div>\n'
}


export const grokTheme = (): Theme => {
  return {
    name: 'grok-theme',
    clientConfigFile: path.resolve(__dirname, 'client.ts'),
    plugins: [
      headersPlugin,
      slimsearchPlugin({
        indexContent: true,
        locales: {
          '/': {
            search: '搜索教程',
            placeholder: '搜索教程',
          },
        },
      }),
      sitemapPlugin({
        hostname: 'https://grokbotguide.pages.dev',
      }),
      seoPlugin({
        hostname: 'https://grokbotguide.pages.dev',
        canonical: 'https://grokbotguide.pages.dev',
        author: '一宿君',
      }),
      readingTimePlugin({
        locales: {
          '/': {
            word: '约 $word 字',
            subMinute: '小于 1 分钟',
            time: '大约 $time 分钟',
          },
        },
      }),
      markdownContainerPlugin({
        type: 'source',
        render: renderSource,
      }),
      markdownContainerPlugin({
        type: 'approval',
        render: renderApproval,
      }),
      markdownContainerPlugin({
        type: 'example',
        render: renderExample,
      }),
      markdownContainerPlugin({
        type: 'todo',
        render: renderTodo,
      }),
    ],
  }
}

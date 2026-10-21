import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'

import { grokTheme } from './theme/index.js'

export default defineUserConfig({
  base: '/',
  dest: 'docs/.vuepress/dist',
  lang: 'zh-CN',
  title: 'Grok Bot 中文指南',
  description:
    'Grok Bot 中文实践手册：从安装、第一个 Bot、云电脑，到 Connectors、Skills、Routines 与可导入的 Bot 模板。',
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#FFFFFF' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
      },
    ],
  ],
  bundler: viteBundler(),
  theme: grokTheme(),
  pagePatterns: ['**/*.md', '!.vuepress', '!node_modules'],
  shouldPrefetch: false,
  shouldPreload: false,
})

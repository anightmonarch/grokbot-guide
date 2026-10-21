/**
 * Scaffold the page skeleton for GrokBot Guide.
 *
 * The script owns nothing but the page list below: it never imports the theme
 * and never overwrites an existing file, so hand written content is safe.
 *
 * Usage:
 *   node scripts/scaffold-pages.mjs
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')
const docsDir = join(rootDir, 'docs')

const VERIFIED = '2026-10-20'

/**
 * @type {Array<{
 *   path: string,
 *   title: string,
 *   eyebrow: string,
 *   custom: boolean,
 *   description: string,
 *   cover: string,
 * }>}
 */
const pages = [
  {
    path: '/',
    title: 'GrokBot Guide',
    eyebrow: 'HOME',
    custom: true,
    description:
      'Grok Bot 中文实践手册，覆盖安装、第一个 Bot、云电脑与进阶工作台。',
    cover: '本站汇总了从上手安装到日常协作的实践路径。',
  },
  {
    path: '/bots/',
    title: 'Bot 馆',
    eyebrow: 'BOTS',
    custom: true,
    description: '可导入的 Grok Bot 模板与职责示例合集。',
    cover: '这里会按职责整理可直接使用的 Bot 模板。',
  },
  {
    path: '/paths/',
    title: '学习路线',
    eyebrow: 'PATHS',
    custom: true,
    description: '按目标挑选学习顺序，从 30 分钟入门到 7 天进阶。',
    cover: '这里会按不同目标给出推荐的学习顺序。',
  },
  {
    path: '/scenarios/',
    title: '场景库',
    eyebrow: 'SCENARIOS',
    custom: true,
    description: '常见使用场景与对应 Bot 组合方式速查。',
    cover: '这里会按场景整理常用的 Bot 组合方式。',
  },
  {
    path: '/start/',
    title: '上手',
    eyebrow: 'START',
    custom: false,
    description: '上手章节索引，串起从安装到创建第一个 Bot 的完整流程。',
    cover: '本页会给出上手阶段的章节顺序与阅读建议。',
  },
  {
    path: '/start/what-is/',
    title: 'Grok Bot 是什么',
    eyebrow: 'START · 01',
    custom: false,
    description: '解释 Grok Bot 的定位、云电脑模型与多 Bot 协作方式。',
    cover: '本页会解释 Grok Bot 的基本概念与它和普通聊天助手的差异。',
  },
  {
    path: '/start/install/',
    title: '安装与登录',
    eyebrow: 'START · 02',
    custom: false,
    description: '整理 Grok Bot 客户端的下载、安装与登录步骤。',
    cover: '本页会说明各平台的下载、安装与登录步骤。',
  },
  {
    path: '/start/plans/',
    title: '订阅与资格',
    eyebrow: 'START · 03',
    custom: false,
    description: '说明可用订阅方案、账号要求与免费额度边界。',
    cover: '本页会说明可用的订阅方案与使用资格要求。',
  },
  {
    path: '/start/first-bot/',
    title: '创建第一个 Bot',
    eyebrow: 'START · 04',
    custom: false,
    description: '手把手带你在平台上创建、命名并配置第一个 Bot。',
    cover: '本页会带你完成第一个 Bot 的创建与基础配置。',
  },
  {
    path: '/start/computer/',
    title: '云电脑与接管',
    eyebrow: 'START · 05',
    custom: false,
    description: '讲解云电脑的文件、终端与浏览器会话如何被 Bot 使用。',
    cover: '本页会说明云电脑的工作目录、终端与浏览器会话。',
  },
  {
    path: '/start/local-exec/',
    title: '本地执行',
    eyebrow: 'START · 06',
    custom: false,
    description: '说明如何把任务交给你本机执行以及适用的安全边界。',
    cover: '本页会说明本地执行的方式与需要注意的安全边界。',
  },
  {
    path: '/start/mobile/',
    title: '手机端',
    eyebrow: 'START · 07',
    custom: false,
    description: '介绍手机端的使用场景、能力差异与操作注意事项。',
    cover: '本页会介绍手机端能做什么以及与桌面端的差异。',
  },
  {
    path: '/workbench/',
    title: '工作台',
    eyebrow: 'WORKBENCH',
    custom: false,
    description: '工作台章节索引，涵盖连接器、技能、定时任务与记忆。',
    cover: '本页会给出工作台各章节的阅读顺序。',
  },
  {
    path: '/workbench/connectors/',
    title: 'Connectors',
    eyebrow: 'WORKBENCH · 01',
    custom: false,
    description: '说明连接器的用途、配置步骤与授权范围。',
    cover: '本页会说明连接器的用途、配置方式与授权范围。',
  },
  {
    path: '/workbench/skills/',
    title: 'Skills',
    eyebrow: 'WORKBENCH · 02',
    custom: false,
    description: '介绍如何把走通的流程沉淀为可复用的技能。',
    cover: '本页会介绍如何把走通的流程沉淀为可复用的技能。',
  },
  {
    path: '/workbench/routines/',
    title: 'Routines',
    eyebrow: 'WORKBENCH · 03',
    custom: false,
    description: '讲解定时与事件触发的任务配置方式。',
    cover: '本页会讲解定时与事件触发的任务如何配置。',
  },
  {
    path: '/workbench/memory/',
    title: '记忆',
    eyebrow: 'WORKBENCH · 04',
    custom: false,
    description: '解释记忆与上下文的保存范围及清理方法。',
    cover: '本页会解释记忆与上下文的保存范围以及清理方式。',
  },
  {
    path: '/workbench/multi-bot/',
    title: '多 Bot 协作',
    eyebrow: 'WORKBENCH · 05',
    custom: false,
    description: '介绍多 Bot 分工、并行与相互交接的协作方式。',
    cover: '本页会介绍多个 Bot 之间的分工、并行与交接方式。',
  },
  {
    path: '/workbench/security/',
    title: '安全与审批',
    eyebrow: 'WORKBENCH · 06',
    custom: false,
    description: '汇总审批机制、权限边界与敏感操作的处理建议。',
    cover: '本页会汇总审批机制、权限边界与敏感操作的处理建议。',
  },
  {
    path: '/faq/',
    title: '常见问题',
    eyebrow: 'FAQ',
    custom: false,
    description: '收录高频问题与简短解答。',
    cover: '本页会收录使用过程中出现频率最高的问题。',
  },
  {
    path: '/faq/pitfalls/',
    title: '新手坑点',
    eyebrow: 'FAQ · 01',
    custom: false,
    description: '列出新手容易踩到的坑与对应的规避办法。',
    cover: '本页会列出新手容易踩到的坑与对应的规避办法。',
  },
  {
    path: '/paths/30min/',
    title: '30 分钟入门',
    eyebrow: 'PATHS · 30MIN',
    custom: false,
    description: '给出一条三十分钟内可完成的最短上手路径。',
    cover: '本页会给出三十分钟内可以走完的最短上手路径。',
  },
  {
    path: '/paths/7days/',
    title: '7 天进阶',
    eyebrow: 'PATHS · 7DAYS',
    custom: false,
    description: '给出按天推进的一周进阶学习安排。',
    cover: '本页会给出按天推进的一周进阶学习安排。',
  },
  {
    path: '/paths/by-role/',
    title: '按角色',
    eyebrow: 'PATHS · ROLE',
    custom: false,
    description: '按开发者、内容运营与团队负责人等角色给出推荐顺序。',
    cover: '本页会按角色给出各自推荐的阅读顺序。',
  },
  {
    path: '/contribute/',
    title: '共建',
    eyebrow: 'CONTRIBUTE',
    custom: false,
    description: '说明如何参与校对、补充内容与提交改进。',
    cover: '本页会说明参与校对、补充内容与提交改进的方式。',
  },
  {
    path: '/about/',
    title: '关于本站',
    eyebrow: 'ABOUT',
    custom: false,
    description: '介绍本站的定位、资料来源与使用说明。',
    cover: '本页会介绍本站的定位、资料来源与使用说明。',
  },
]

/**
 * Resolve a site path to the markdown file that backs it.
 * @param {string} sitePath
 * @returns {string}
 */
const resolveFile = (sitePath) => {
  const segments = sitePath.split('/').filter(Boolean)
  return segments.length === 0
    ? join(docsDir, 'README.md')
    : join(docsDir, ...segments, 'README.md')
}

/**
 * @param {{ title: string, description: string, eyebrow: string, custom: boolean, cover: string }} page
 * @returns {string}
 */
const renderPage = (page) => {
  const frontmatter = [
    '---',
    `title: ${page.title}`,
    `description: "${page.description}"`,
    `eyebrow: ${page.eyebrow}`,
    `verified: ${VERIFIED}`,
  ]

  if (page.custom) frontmatter.push('pageType: custom')

  frontmatter.push('---', '')

  const body = page.custom
    ? `<div class="g-placeholder"><h1>${page.title}</h1></div>\n`
    : `<!-- TODO: 正文待补 -->\n\n## 本页内容\n\n${page.cover}\n`

  return `${frontmatter.join('\n')}\n${body}`
}

let created = 0
let skipped = 0

for (const page of pages) {
  const file = resolveFile(page.path)

  if (existsSync(file)) {
    skipped += 1
    console.log(`skip   ${page.path} (${file} already exists)`)
    continue
  }

  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, renderPage(page), 'utf8')
  created += 1
  console.log(`create ${page.path} -> ${file}`)
}

console.log(`\n${created} page(s) created, ${skipped} page(s) skipped.`)

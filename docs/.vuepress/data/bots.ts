import type { BotShape } from '../theme/botmark/geometry'

export interface BotTemplate {
  id: string
  name: string
  role: string
  job: string
  tag: string
  color: string
  /** BotMark outline */
  shape: BotShape
  bubble: string
  desc: string
  tutorial: string
  shareId: string | null
}

/**
 * `shareId` is the real Grok Bot share id used as `https://x.ai/bot/<shareId>`.
 * Real share ids from published templates (2026-10-20).
 */
export const BOT_TAGS = ['内容', '开发', '自动化', '安全', '研究', '财务']

export const shareUrl = (b: BotTemplate): string | null =>
  b.shareId ? `https://x.ai/bot/${b.shareId}` : null

export const BOTS: BotTemplate[] = [
  {
    id: 'xiaoye',
    name: '小夜',
    role: '选题主编',
    job: '收藏进选题库，周报草稿停在审批卡。',
    tag: '内容',
    color: '#EB4699',
    shape: 'cloud',
    bubble: '先让我把出处写清楚，再谈发不发。',
    desc: '负责选题搜集与周报草稿，外发前一律停在审批卡。适合创作者把选题与发布拆开：搜集与起草交给她，发送留给你。',
    tutorial: '/start/first-bot/',
    shareId: '3RuJUqMWZjWQa_H08bDhZ',
  },
  {
    id: 'machu',
    name: '码初',
    role: '工程搭档',
    job: '开 PR、挂预览链接，失败时贴日志摘要。',
    tag: '开发',
    color: '#3C82F6',
    shape: 'hex',
    bubble: '预览绿了我才敲你。',
    desc: '负责开 PR、挂预览链接，构建失败时贴日志摘要；合并一律等你点头。适合把重复的提交与回报交给它，代码审阅留给你。',
    tutorial: '/scenarios/',
    shareId: 'nFcgt3R5TfLuv_yaJ106Y',
  },
  {
    id: 'chenhao',
    name: '晨号',
    role: '例程管家',
    job: '每日晨报 08:00，Test run 过了才上线。',
    tag: '自动化',
    color: '#F19D38',
    shape: 'circle',
    bubble: '没过 Test run，我不开闹钟。',
    desc: '负责每日晨报与 Routine 维护。新例程先跑一次 Test run，结果确认后再启用。适合把「每天固定时间看一眼」的事交给它。',
    tutorial: '/workbench/routines/',
    shareId: 'e0XP4aqaiomRWWni1rH2s',
  },
  {
    id: 'piqian',
    name: '批签',
    role: '审批守门',
    job: '外发邮件 / 发帖 / 开 PR，一律等你点头。',
    tag: '安全',
    color: '#0A0A0A',
    shape: 'squircle',
    bubble: '你不点发送，我哪儿也不去。',
    desc: '负责把外发动作排进审批：邮件、发帖、开 PR 都先出草稿，你确认后才执行。适合放在其他 Bot 前面当守门人。',
    tutorial: '/workbench/security/',
    shareId: 'GDzHVcUtVuwIDnaur766Z',
  },
  {
    id: 'shizhi',
    name: '拾纸',
    role: '研究助理',
    job: '论文/长文摘要进 Notion，附引用页码。',
    tag: '研究',
    color: '#54B9A6',
    shape: 'drop',
    bubble: '六篇读完了，要不要我标优先级？',
    desc: '负责读论文与长文，摘要写进 Notion 并附引用页码，拿不准的地方单独标出。适合把「先读一遍」交给它，判断留给你。',
    tutorial: '/workbench/connectors/',
    shareId: '9vxeKeJvykZ-RNB6-7hVd',
  },
  {
    id: 'zhangqing',
    name: '账青',
    role: '对账助手',
    job: '本地 CSV 记账，月底生成对账表。',
    tag: '财务',
    color: '#5BC67A',
    shape: 'pill',
    bubble: '数字对得上我才闭嘴。',
    desc: '负责整理本地 CSV 账目，月底生成对账表给你核对；不碰网银，不做付款。适合把对账的体力活交给它。',
    tutorial: '/start/local-exec/',
    shareId: 'oicxOp3Wo1ozVa3PHNDMC',
  },
]

export const findBot = (id: string): BotTemplate | undefined =>
  BOTS.find((bot) => bot.id === id)

export interface PathRow {
  key: string
  badge: string
  title: string
  desc: string
  link: string
}

export interface PathRole {
  key: string
  bot: string
  title: string
  desc: string
  link: string
}

export const PATH_ROWS: PathRow[] = [
  {
    key: '30min',
    badge: '30 分钟',
    title: '30 分钟入门',
    desc: '安装 → 窄职责 Bot → 五要素首单 → 看到成果卡。合上电脑前留一份你认可的交付物。',
    link: '/paths/30min/',
  },
  {
    key: '7days',
    badge: '7 天',
    title: '7 天进阶',
    desc: '插件、Skill、Routine、第二位专家、用量复盘。里程碑：1 Skill + 1 Routine，外发仍需审批。',
    link: '/paths/7days/',
  },
]

export const ROLES: PathRole[] = [
  {
    key: 'creator',
    bot: 'xiaoye',
    title: '创作者',
    desc: '选题 Bot → Notion 看板 → 写稿/校对 → 数据 Routine。从「小夜」模板起步。',
    link: '/paths/by-role/#creator',
  },
  {
    key: 'dev',
    bot: 'machu',
    title: '开发者',
    desc: 'CoS 调度 + Cloud Agent 开 PR + webhook。重活不占满对话上下文。从「码初」起步。',
    link: '/paths/by-role/#developer',
  },
  {
    key: 'ops',
    bot: 'chenhao',
    title: '运营',
    desc: '晨报 Routine + 审批守门。合上笔记本后的交卷节奏。从「晨号」与「批签」起步。',
    link: '/paths/by-role/#ops',
  },
]

export interface SidebarItem {
  text: string
  link: string
}

export interface SidebarGroup {
  label: string
  items: SidebarItem[]
}

export const sidebarGroups: SidebarGroup[] = [
  {
    label: '入门',
    items: [
      { text: '入门总览', link: '/start/' },
      { text: 'Grok Bot 是什么', link: '/start/what-is/' },
      { text: '安装与登录', link: '/start/install/' },
      { text: '订阅与资格', link: '/start/plans/' },
      { text: '创建第一个 Bot', link: '/start/first-bot/' },
      { text: '云电脑与接管', link: '/start/computer/' },
      { text: '本地执行', link: '/start/local-exec/' },
      { text: '手机端', link: '/start/mobile/' },
    ],
  },
  {
    label: '工作台',
    items: [
      { text: '工作台总览', link: '/workbench/' },
      { text: 'Connectors', link: '/workbench/connectors/' },
      { text: 'Skills', link: '/workbench/skills/' },
      { text: 'Routines', link: '/workbench/routines/' },
      { text: '记忆', link: '/workbench/memory/' },
      { text: '多 Bot 协作', link: '/workbench/multi-bot/' },
      { text: '安全与审批', link: '/workbench/security/' },
      { text: 'Channels', link: '/workbench/channels/' },
      { text: 'Cloud Agents', link: '/workbench/cloud-agents/' },
    ],
  },
  {
    label: '设置',
    items: [
      { text: '设置总览', link: '/workbench/settings/' },
      { text: '设置 · 电脑', link: '/workbench/settings/computer/' },
      { text: '设置 · 通用', link: '/workbench/settings/general/' },
      { text: '设置 · 用量', link: '/workbench/settings/usage/' },
      { text: '设置 · 更新', link: '/workbench/settings/updates/' },
    ],
  },
  {
    label: 'Q&A',
    items: [
      { text: '常见问题', link: '/faq/' },
      { text: '新手坑点', link: '/faq/pitfalls/' },
      { text: 'Q&A 手册', link: '/faq/troubleshoot/' },
    ],
  },
]

export const sidebarLinks: SidebarItem[] = sidebarGroups.flatMap(
  (group) => group.items,
)

export function getPrevNext(
  routePath: string,
): { prev: SidebarItem | null; next: SidebarItem | null } {
  const index = sidebarLinks.findIndex((item) => item.link === routePath)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: sidebarLinks[index - 1] ?? null,
    next: sidebarLinks[index + 1] ?? null,
  }
}

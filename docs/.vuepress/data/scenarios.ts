export interface ScenarioSource {
  label: string
  url: string
}

export interface Scenario {
  id: string
  tags: string[]
  cat: string
  title: string
  desc: string
  bot: string
  source: ScenarioSource
  tutorial: string
}

export const SCENARIO_TAGS = ['内容', '工程', '自动化', '安全', '研究', '财务']

export const SCENARIOS: Scenario[] = [
  {
    id: 'topic-inbox',
    tags: ['内容', '新手友好'],
    cat: '内容',
    title: '收藏进选题库，停在审批卡',
    desc: '把收藏变成可开工的选题：接 Notion、用五要素下第一单、出处逐条可查，草稿停在审批卡前等你点头。',
    bot: 'xiaoye',
    source: {
      label: 'sspai.com · 社区实践改写',
      url: 'https://sspai.com/post/116250',
    },
    tutorial: '/start/first-bot/',
  },
  {
    id: 'intel-digest',
    tags: ['内容', '自动化'],
    cat: '内容',
    title: '每日 AI 情报例程',
    desc: '定时整理时间线与关注源，标未核实，Test run 过了才启用例程。',
    bot: 'chenhao',
    source: {
      label: '一宿君 · 作者实践',
      url: '/about/',
    },
    tutorial: '/workbench/routines/',
  },
  {
    id: 'cloud-agent-pr',
    tags: ['工程', '需审批 · 合并'],
    cat: '工程',
    title: 'Cloud Agent 开带预览的 PR',
    desc: 'Bot 交代需求，云端编码代理在 GitHub 开 PR 并挂上预览证据；合并这一步永远留在人手里。',
    bot: 'machu',
    source: {
      label: 'docs.x.ai · Teams & enterprises',
      url: 'https://docs.x.ai/grok-bot/teams-and-enterprises',
    },
    tutorial: '/workbench/cloud-agents/',
  },
  {
    id: 'box-harness',
    tags: ['工程'],
    cat: '工程',
    title: '在云电脑装 CLI 写代码',
    desc: '在 Bot 云电脑安装命令行工具并拉仓库；公司代码先过合规。',
    bot: 'machu',
    source: {
      label: '一宿君 · 作者实践',
      url: '/about/',
    },
    tutorial: '/start/computer/',
  },
  {
    id: 'watch-quota',
    tags: ['工程'],
    cat: '工程',
    title: '盯本机编码工具额度并恢复任务',
    desc: '本机授权后，等到可继续再点击；先只读汇报，再受控点击。',
    bot: 'machu',
    source: {
      label: '一宿君 · 作者实践',
      url: '/about/',
    },
    tutorial: '/start/local-exec/',
  },
  {
    id: 'bug-repro',
    tags: ['工程'],
    cat: '工程',
    title: '预发环境复现缺陷包',
    desc: '读报告、在预发用测试账号复现，回传步骤与证据；不用生产客户数据。',
    bot: 'machu',
    source: {
      label: 'docs.x.ai · Use cases',
      url: 'https://docs.x.ai/grok-bot/use-cases',
    },
    tutorial: '/workbench/routines/',
  },
  {
    id: 'tested-briefing',
    tags: ['自动化'],
    cat: '自动化',
    title: 'Test run 过了才响的晨报',
    desc: '每日 08:00 的例程先跑 Test run，失败就贴日志摘要、成功才推晨报；六项确认写清楚，才敢让它自己跑。',
    bot: 'chenhao',
    source: {
      label: 'docs.x.ai · Routines',
      url: 'https://docs.x.ai/grok-bot/skills-routines-and-automations',
    },
    tutorial: '/workbench/routines/',
  },
  {
    id: 'agent-email',
    tags: ['自动化', '需审批 · 外发'],
    cat: '自动化',
    title: 'Bot 邮箱收验证码与草稿外发',
    desc: '申请专属邮箱收验证码；外发一律草稿审批。个人可用性以客户端为准。',
    bot: 'piqian',
    source: {
      label: '一宿君 · 作者实践',
      url: '/about/',
    },
    tutorial: '/start/first-bot/',
  },
  {
    id: 'approval-gate',
    tags: ['安全', '需审批 · 外发'],
    cat: '安全',
    title: '外发前一律过审批守门',
    desc: '邮件、发帖、开 PR 统一排队成审批卡：先看目标与参数再点 Allow once，Always allow 只给写窄的动作。',
    bot: 'piqian',
    source: {
      label: 'docs.x.ai · Approvals',
      url: 'https://docs.x.ai/grok-bot/approvals-security-and-privacy',
    },
    tutorial: '/workbench/security/',
  },
  {
    id: 'notion-digest',
    tags: ['研究'],
    cat: '研究',
    title: '多源摘要进 Notion，附页码',
    desc: '网页、论文、长文一起读，结论写进 Notion 并逐条标出处与页码；读到的指令不算你的指令。',
    bot: 'shizhi',
    source: {
      label: 'linux.do · 社区实践改写',
      url: 'https://linux.do/t/topic/2991469',
    },
    tutorial: '/workbench/connectors/',
  },
  {
    id: 'csv-ledger',
    tags: ['财务'],
    cat: '财务',
    title: '本地 CSV 月底对账表',
    desc: '只读本地记账 CSV、生成月底对账表给你核对；不碰网银、不发起付款，付款这一步永远是你按下的。',
    bot: 'zhangqing',
    source: {
      label: '一宿君 · 原创模板',
      url: '/bots/zhangqing/',
    },
    tutorial: '/start/local-exec/',
  },
]

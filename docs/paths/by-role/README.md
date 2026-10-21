---
title: 按角色
description: "创作者、开发者、运营三条必读页与推荐场景，按需跳转。"
eyebrow: PATHS · 角色
verified: 2026-10-20
---

::: source
[docs.x.ai/grok-bot/use-cases](https://docs.x.ai/grok-bot/use-cases) · [docs.x.ai/grok-bot/get-started](https://docs.x.ai/grok-bot/get-started)
:::

先完成[30 分钟入门](/paths/30min/)再按角色跳。下列链接指向本站已有正文与场景。一人公司可以三条都看，但同一周只深挖一条，避免同时开很多例程。

## 怎么选角色分支

- 产出主要是文章、选题、社媒：走**创作者**。
- 产出主要是仓库、PR、复现包：走**开发者**。
- 产出主要是日程、邮件草稿、多 Bot 协调：走**运营 / 管家**。

选完后：先做该分支「必读」前两页，再跟做一条「推荐场景」，最后才定例程。

## 创作者

**必读**

1. [创建第一个窄职责 Bot](/start/first-bot/) — 五要素与外发禁令
2. [Connectors](/workbench/connectors/) — 只读优先，`@` 挂接
3. [Routines](/workbench/routines/) — Test run 后再启用
4. [安全与审批](/workbench/security/) — 草稿与 Ask first
5. [Channels](/workbench/channels/) — 草稿卡与 Tag @bot 边界（可选加深）

**推荐场景**

- [收藏进选题库](/scenarios/topic-inbox/)（小夜）
- [每日 AI 情报例程](/scenarios/intel-digest/)
- [多源摘要进 Notion](/scenarios/notion-digest/)（拾纸）

**Bot 馆**：[小夜](/bots/xiaoye/) · [拾纸](/bots/shizhi/) · [晨号](/bots/chenhao/)

**本周最小交付**：1 个窄职责选题 / 情报 Bot + 1 次只读连接器任务 + 1 个未启用或低频、已 Test run 的例程草稿。

## 开发者

**必读**

1. [云电脑与接管](/start/computer/) — 任务跑在哪、`/workspace`
2. [本地执行](/start/local-exec/) — 本机窗口与审批天花板
3. [设置 · 电脑](/workbench/settings/computer/) — Update / Reset、本机执行策略
4. [Cloud Agents](/workbench/cloud-agents/) — 委派编码与结果回传
5. [Q&A 手册](/faq/troubleshoot/) — 电脑连不上时的恢复顺序

**推荐场景**

- [Cloud Agent 开 PR](/scenarios/cloud-agent-pr/)（码初）
- [云电脑装 CLI](/scenarios/box-harness/)
- [预发复现缺陷包](/scenarios/bug-repro/)
- [盯本机额度恢复](/scenarios/watch-quota/)（个人实践，慎用）

**Bot 馆**：[码初](/bots/machu/) · [批签](/bots/piqian/)

**本周最小交付**：1 个「只开 PR、不合并」的工程 Bot 描述 + 1 次可核对的 PR/复现包回报 + Auto Review 里一条合并相关 **Ask first**（或等价描述禁令）。

## 运营 / 管家

**必读**

1. [多 Bot 协作](/workbench/multi-bot/) — 群目标与交接
2. [Routines](/workbench/routines/) — 晨报类自动化前先 Test run
3. [Channels](/workbench/channels/) — 邮件 / Slack 草稿卡
4. [记忆](/workbench/memory/) — 长期偏好怎么写、勿塞密钥
5. [安全与审批](/workbench/security/) — 外发守门

**推荐场景**

- [Test run 过了才响的晨报](/scenarios/tested-briefing/)
- [外发前审批守门](/scenarios/approval-gate/)
- [Bot 邮箱与草稿](/scenarios/agent-email/)（可用性见页内 todo）
- [本地 CSV 对账](/scenarios/csv-ledger/)（账青）

**Bot 馆**：[晨号](/bots/chenhao/) · [批签](/bots/piqian/) · [账青](/bots/zhangqing/)

**本周最小交付**：1 个守门外发的规则（描述 + Ask first）+ 1 次草稿卡练习 + 1 个已 Test run 的晨报 / 摘要例程（可仍暂停）。

## 跨角色都要守的三条

1. 外发与付款停在审批卡 / 草稿卡。
2. 共享云电脑不是安全边界——登录与文件对账号下所有 Bot 可见。
3. 价格与额度只看官方页，本站不写数字。

## 官方角色卡

官方 Use cases 另有 Sales Outbound、Talent Scout、Account Health、Chief of Staff 等英文角色卡，可作描述草稿来源：[docs.x.ai/grok-bot/use-cases](https://docs.x.ai/grok-bot/use-cases)。本站优先链已写成中文场景的条目。

## 从官方 Use cases 改编描述时

把英文角色卡里的 Owns / Connect / Start with 译成你的描述与第一单即可，并补上「什么必须先问你」。不要照抄未核实的第三方工作流当官方能力。改编后仍走五要素首单，再进技能与例程。

## 和 7 天路线怎么叠加

- 已定角色：用本页必读替换[7 天](/paths/7days/)里较泛的阅读，但 **Day 4 Test run** 与 **Day 5 审批**不要跳过。
- 未定角色：先跑完 7 天最小作品集，再用本页选加深场景。


## 角色内推荐阅读顺序（示例一周）

**创作者周**：first-bot → connectors（只读）→ topic-inbox 跟做 → skills 存一份 → routines 低频 Test run → security 补 Ask first。

**开发者周**：computer → local-exec → settings/computer → cloud-agents 概念 → cloud-agent-pr 跟做一单（不合并）→ troubleshoot 演练恢复顺序。

**运营周**：multi-bot → channels 草稿练习 → approval-gate → tested-briefing（Test run）→ memory 只写偏好不写密钥 → agent-email（若账号开放）。

## 兼岗时怎么拆

- 创作者兼运营：例程与草稿卡共用一套 Ask first；Bot 仍拆成「选题」与「守门」两个，不要一个全能。
- 开发者兼运营：合并与外发都停人手；Cloud Agent 开 PR 与晨报例程分属不同 Bot。
- 三人小队：每人认领一个角色分支的「本周最小交付」，群聊里只交接文本与链接，审批回一对一。

## 不要用角色当借口跳过的事

- 跳过五要素首单直接上官方英文角色卡。
- 跳过 Test run 开「每日全网监控」。
- 跳过设置电脑页就 Reset。
- 在群聊里处理合并或外发审批。

## 下一步

- [7 天进阶](/paths/7days/) · [场景库](/scenarios/) · [Bot 馆](/bots/)
- [30 分钟入门](/paths/30min/)（若尚未完成）

---
title: 7 天进阶
description: "七天日程：技能、例程、多 Bot、审批与 Q&A；每天有可交付物。"
eyebrow: PATHS · 7DAYS
verified: 2026-10-20
---

::: source
[docs.x.ai/grok-bot/skills-routines-and-automations](https://docs.x.ai/grok-bot/skills-routines-and-automations) · [docs.x.ai/grok-bot/chat-and-collaboration](https://docs.x.ai/grok-bot/chat-and-collaboration) · [docs.x.ai/grok-bot/approvals-security-and-privacy](https://docs.x.ai/grok-bot/approvals-security-and-privacy)
:::

假设你已完成[30 分钟入门](/paths/30min/)。每天只追求一个可勾选交付物；自动化一律先 **Test run**。建议每天只划 45–90 分钟；超时就把「做成例程」留到第二天。

## Day 1 · 概念对齐

- 读：[Grok Bot 是什么](/start/what-is/) · 可选扫[入门总览](/start/)
- 做：对照自己账号，写出 Bot、云电脑、连接器、技能、例程各一句话。
- 交付：三到五句话笔记，能向同事解释「任务跑在哪、谁点发送」。

## Day 2 · 连接器

- 读：[Connectors](/workbench/connectors/)
- 做：装一个工作真用得到的连接器，跑一只读任务；对话里 `@` 挂接。
- 交付：对话里有一次成功的挂接记录（可本地摘录，勿贴密钥）。
- 坑：没有插件时硬用浏览器点来点去；只读任务却要写入权限。

## Day 3 · 存技能

- 读：[Skills](/workbench/skills/)
- 做：把 Day 2 的流程按六要素（目标、步骤、输入、验证、失败处理、审批边界）存成技能；`/` 能调出。
- 交付：技能名 + 六要素自检清单打勾。
- 坑：把一次性闲聊存成技能；技能里写「随便发挥」。

## Day 4 · 例程与 Test run

- 读：[Routines](/workbench/routines/) · 场景[晨报](/scenarios/tested-briefing/)
- 做：建低频例程（间隔 ≥ 5 分钟或按官方下限），**Test run** 通过再启用；优先只读或只出草稿。
- 交付：一次成功的 Test run 记录截图或文字摘要（可本地保存）。
- 坑：未 Test run 就开高频；例程里直接外发到真实客户。

## Day 5 · 审批与安全

- 读：[安全与审批](/workbench/security/) · [设置 · 电脑](/workbench/settings/computer/) · 场景[审批守门](/scenarios/approval-gate/)
- 做：为外发类动作加窄 **Ask first**；确认本机执行策略不是过宽；描述里补「先出草稿」常驻句。
- 交付：描述里的禁令原文 + Auto Review 规则各一条（可打码）。
- 坑：用一条超宽 Always allow 盖住所有 send；公司代码是否上云仍未想清楚。

## Day 6 · 多 Bot 或渠道

- 读：[多 Bot 协作](/workbench/multi-bot/) · [Channels](/workbench/channels/)
- 做（二选一即可）：
  - 建群或加第二个窄职责 Bot，写清群目标与谁拥有下一步；或
  - 跑通一次邮件 / Slack 草稿卡（不真发也行）；感兴趣可扫[agent-email](/scenarios/agent-email/)。
- 交付：群目标一句话，或一张草稿卡流程说明。
- 坑：在群聊里等审批卡 / 草稿卡（官方：它们不出现在群聊）；同时 tag 很多 Bot 造成重复劳动。

## Day 7 · 复盘与 Q&A 演练

- 读：[Q&A 手册](/faq/troubleshoot/) · [新手坑点](/faq/pitfalls/)
- 做：按「电脑连不上」顺序口头演练一遍（不必真 Reset）；可选扫[Cloud Agents](/workbench/cloud-agents/)概念，完整开 PR 留给场景[cloud-agent-pr](/scenarios/cloud-agent-pr/)。
- 交付：个人「常用恢复顺序」五步笔记（优先 Update，Reset 最后）。

## 节奏建议

- 例程宁少勿密；优先草稿与只读。
- 一事一对话，省用量（本站不写数字）。
- 公司代码是否上云，Day 5 前必须想清楚。
- 某一天失败（插件掉线、电脑更新中）→ 改做[Q&A](/faq/troubleshoot/)对应小节，不要硬推进度。
- 官方顺序同样是：先一次性任务，再技能，最后例程。

## 每日时间盒

建议每天只划 45–90 分钟。超时就把「做成例程」留到第二天，先保证手动路径稳定。若你只能周末连做，把 Day 1–3 放一天、Day 4–5 放一天、Day 6–7 放一天，中间不要开新的高频自动化。

## 一周结束时的最小作品集

- 1 个写清边界的 Bot 描述
- 1 个六要素技能
- 1 个经过 Test run 的例程（可以仍是暂停状态）
- 1 条 Ask first 规则或等价描述禁令
- 1 份个人恢复顺序笔记

有这五样，就比「收藏了很多教程链接」更接近真实工作流。

## 可选加深（第 8 天以后）

- 创作者向：[topic-inbox](/scenarios/topic-inbox/) · [intel-digest](/scenarios/intel-digest/) · [notion-digest](/scenarios/notion-digest/)
- 开发者向：[cloud-agent-pr](/scenarios/cloud-agent-pr/) · [box-harness](/scenarios/box-harness/) · [bug-repro](/scenarios/bug-repro/)
- 运营向：[tested-briefing](/scenarios/tested-briefing/) · [approval-gate](/scenarios/approval-gate/) · [csv-ledger](/scenarios/csv-ledger/)

完整分流见[按角色](/paths/by-role/)。


## 每天开始前的 60 秒检查

1. 云电脑是否在更新中？（忙时不要硬塞重任务，见[设置 · 电脑](/workbench/settings/computer/)）
2. 昨天的例程是否仍暂停？未 Test run 的不要误点 **Active**。
3. 今天是否只做一个交付物？把「顺便再做一个」写进明天。

## Day 4–5 之间多停一天也没关系

很多人在「技能能跑」和「例程自动跑」之间摔倒。允许自己在 Day 3 与 Day 4 之间多做两次手动 `/` 调技能，确认失败处理写清楚了，再进 Test run。官方强调的顺序同样是一次性任务 → 技能 → 例程，不是反过来。

## 外发与渠道穿插（可选，不占主交付）

若你的工作强依赖邮件 / Slack：把[Channels](/workbench/channels/)的草稿卡练习插在 Day 5 或 Day 6，仍然遵守「先 Discard 练手」。Agent Email 是否对你账号开放，以客户端为准，完整步骤见[agent-email](/scenarios/agent-email/)。

开发者若已有仓库连接器，可把[Cloud Agents](/workbench/cloud-agents/)概念阅读放在 Day 7，**完整开 PR 跟做**放到场景[cloud-agent-pr](/scenarios/cloud-agent-pr/)，不要在 Day 4 例程里自动合并。

## 失败日怎么记

写三行即可：现象（原文）→ 你试了哪一步 → 明天最小复现。不要为了「日历上的 Day n」硬推。一周目标是最小作品集五件，不是打卡贴纸。

## 下一步

- [按角色](/paths/by-role/) · [场景库](/scenarios/) · [Cloud Agents](/workbench/cloud-agents/)
- [Channels](/workbench/channels/) · [记忆](/workbench/memory/)

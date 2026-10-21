---
title: 新手坑点
description: "第一周常见坑：对话过载、例程过密、共享电脑、审批过期、隐私模式、Always allow 与 Reset。"
eyebrow: FAQ · 01
verified: 2026-10-20
---

::: source
[docs.x.ai/grok-bot/troubleshooting](https://docs.x.ai/grok-bot/troubleshooting) · [docs.x.ai/grok-bot/approvals-security-and-privacy](https://docs.x.ai/grok-bot/approvals-security-and-privacy) · [docs.x.ai/grok-bot/skills-routines-and-automations](https://docs.x.ai/grok-bot/skills-routines-and-automations) · [docs.x.ai/grok-bot/computer-and-apps](https://docs.x.ai/grok-bot/computer-and-apps) · [docs.x.ai/grok-bot/faq](https://docs.x.ai/grok-bot/faq)
:::

下面这些坑大多出现在第一周。多数不用重装，按提示调整即可。

## 1. 一个对话里塞了好几件事

对话适合一件具体任务。官方建议：当工作变成另一件长期任务时，另起对话或新建 Bot，而不是继续堆在同一条对话里。社区经验也提到，一事一对话更省用量。

社区经验来源：[论坛讨论](https://forum.cursor.com/t/grok-bot-ultra-users-how-do-you-make-the-weekly-allowance-last-mine-reached-99-in-three-days/171221)

## 2. 例程跑得太勤或匹配太宽

例程时间表至少间隔五分钟。官方提醒：像「每条新消息都听」这种宽匹配会产生噪音、消耗用量，也更容易误动作。把规则收窄到具体频道、关键词和动作。先 **Test run**，再正式启用。

## 3. 把不同 Bot 当成不同安全域

屏幕是分开的工作面，不是安全边界。文件、浏览器会话和命令行凭证在账号内共享：为一个 Bot 登录，其他 Bot 同样能用。某个服务不再该用时，要在那台电脑上退出登录。不要把不该被其他 Bot 看到的凭证放进云电脑。

## 4. 审批卡过期了

由例程、触发器或其他 Bot 发起的工作，其审批大约十分钟过期，卡片显示 **Expired**，动作不会执行。过期卡片上的 **Always allow this in the future** 只添加规则，不会补做那次动作。让 Bot 再试一次即可。

## 5. Legacy Privacy Mode 挡住启动

Grok Bot 需要云端数据存储，不支持 Legacy Privacy Mode。出现相关报错时，把 Cursor 账号的数据设置改到受支持的状态；组织账号请联系管理员。

## 6. 本地执行随手选了 Always allow

本地执行的审批卡会显示完整命令。范围一放宽就不好回溯。除非有明确理由，保持 **Ask every time** 或 **Never allow**。见[本地执行](/start/local-exec/)。

## 7. Auto Review 规则写得太宽

「浏览器里的一切都允许」这类规则会把风险放大。围绕具体动作与范围写 **Ask first** / **Allow automatically**，冲突时 **Ask first** 优先。

## 8. 过早 Reset 云电脑

**Recover** / **Update** 会保留持久文件与登录；**Reset** 回到上一次快照，可能丢掉最近未同步的工作。只有前面步骤都失败、且你接受丢数据时才 Reset。见[云电脑与接管](/start/computer/)。

## 9. 一周用量很快见底

官方计费与用量说明指向「按工作量」：工具调用、浏览器、子代理、反复重读长对话都会消耗。可行习惯：一事一对话、拉开例程间隔、重活考虑委派 Cloud Agent、技能写清减少空转。具体数字以官方用量页为准，本页不写额度。

社区讨论（含员工回复）：[论坛帖](https://forum.cursor.com/t/grok-bot-ultra-users-how-do-you-make-the-weekly-allowance-last-mine-reached-99-in-three-days/171221)

## 10. 非 HTTPS 出站被拦（社区反馈）

社区论坛有反馈称云电脑出站对非 HTTPS 协议存在限制，导致 SSH、IMAP、SMTP、MySQL 等连接超时。官方文档没有写明该策略的完整适用范围。遇到这类超时时，先确认协议与端口，再考虑浏览器路径或连接器替代。

<!-- TODO: 待核实：非 HTTPS 出站被拦截的具体范围、起始时间与当前状态；论坛反馈约 2026-10，需重新核对官方说明。 -->

社区反馈来源：[论坛讨论](https://forum.cursor.com/t/grok-bot-computer-all-outbound-non-https-traffic-blocked-since-oct-1-mysql-ssh-imap-smtp-ftp-time-out/173504)

## 11. 隐藏 Bot 却以为例程停了

隐藏不会自动暂停例程。不用某个 Bot 时，先到 **Routines** 暂停，再隐藏。

## 12. 公司项目直接拷进云电脑

个人项目可以试验；公司代码上云前先看组织合规。官方写明电脑目前在美国运行。安全边界见[安全与审批](/workbench/security/)。

延伸阅读： [常见问题](/faq/) · [安全与审批](/workbench/security/) · [Routines](/workbench/routines/)

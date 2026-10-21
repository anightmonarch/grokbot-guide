---
title: 常见问题
description: "按主题整理的高频问题与简短解答：能力边界、账号、技能例程、文件与 Q&A。"
eyebrow: FAQ
verified: 2026-10-20
---

::: source
[docs.x.ai/grok-bot/faq](https://docs.x.ai/grok-bot/faq) · [docs.x.ai/grok-bot/troubleshooting](https://docs.x.ai/grok-bot/troubleshooting) · [docs.x.ai/grok-bot/overview](https://docs.x.ai/grok-bot/overview) · [docs.x.ai/grok-bot/files-and-results](https://docs.x.ai/grok-bot/files-and-results) · [docs.x.ai/grok-bot/bots](https://docs.x.ai/grok-bot/bots) · [docs.x.ai/grok-bot/skills-routines-and-automations](https://docs.x.ai/grok-bot/skills-routines-and-automations)
:::

下面按主题整理使用中常被问到的问题。答案以官方文档为准，页面顶部的核对日期标明对照的是哪一版。更细的踩坑见[新手坑点](/faq/pitfalls/)。

## 1. 关于 Grok Bot 本身

### 它和普通 AI 助手有什么不同？

Bot 能使用一台持久云电脑、连接的工具、网站和文件来完成工作，不只是回答问题。它们能在后台继续，保留角色相关的上下文，还能和其他 Bot 协作。

### 我在哪里和它对话？

用 macOS / Windows / Linux 上的 Grok Bot 桌面应用，或 iOS / Android 上的配套应用。同一账号下登录的设备会同步 Bot 与对话。

### 我的笔记本合上后任务会停吗？

不会。Bot 的工作跑在云电脑上。关掉应用、笔记本或手机，都不会中断后台的对话轮次或例程。

### 我的多个 Bot 共用一台电脑吗？

是。账号下每个 Bot 用同一台持久云电脑，共享文件、浏览器会话和登录。电脑按用户分配，不按 Bot 分配，所以不要拿不同 Bot 当安全边界。

### 几个 Bot 能同时工作吗？

能。它们可以并行推理、调用连接器、处理文件并互相协调。每个 Bot 在共享电脑上有一块自己的屏幕，同一时刻一个 Bot 的屏幕上只能跑一个 computer-use 任务。

### 一个 Bot 会记住什么？

它可以保留稳定的偏好、角色背景和过往工作的摘要。对话和学到的角色按 Bot 分开；共享文件、浏览器会话、群聊消息和直接交接会在 Bot 之间传递上下文。要做重要决定，让它查当前来源，而不是只信记忆。详见[记忆](/workbench/memory/)。

### 它能打开任意网站吗？

许多基于浏览器的工具可以用，包括没有专用连接器的服务。网站仍可能拦截自动化、要求重新登录、弹出 CAPTCHA，或要求真人确认。这些步骤应交给你[接管](/start/computer/)，而不是绕过。有连接器时优先用连接器。

### 哪些动作需要我批准？

取决于工具、动作风险，以及（若启用）你的 Auto Review 规则。敏感或后果较大的动作可以停在审批卡。密码、二次验证、CAPTCHA 等则走电脑接管。把长期边界写进 Bot 描述，并为发送、发布、删除、购买、改生产等动作加窄的 **Ask first** 规则。见[安全与审批](/workbench/security/)。

## 2. 关于账号与订阅

### 支持哪些平台？

macOS（Apple silicon 与 Intel）、Windows（x64 与 Arm64）、Linux（x64 与 Arm64，提供 `.deb`、`.rpm` 和 AppImage）、iPhone（iOS 18 及以上）、Android（9 及以上）。iOS 应用也可以在 iPad 上运行，需要 iPadOS 18 及以上。

### 费用怎么算？

取决于账号和方案。Grok Bot 包含在每个付费个人 Cursor 方案和 Cursor Teams 方案里，也可以关联个人的 SuperGrok 订阅。The X Subscription 下部分档位包含 Grok Bot。订阅包含每周用量，符合条件的账号可以另行按用量付费。**价格与额度以官方页面为准**，见[订阅与资格](/start/plans/)。

### 数据和隐私怎么处理？

Grok Bot 使用 Cursor 的身份验证和账号数据设置，训练是否退出跟随 Cursor 的账号与隐私设置。Grok Bot 需要云端数据存储，不支持 Legacy Privacy Mode。你的所有 Bot 都能访问分配给你账号的同一台云电脑。

## 3. 关于技能、例程与协作

### skill 和 routine 有什么区别？

skill 描述怎么完成任务；routine 把一个工作流指派给某个 Bot，规定它什么时候跑——按时间，或在支持的情况下按事件触发。先把技能在一次真实任务上测过，再做成例程。

### Teach a task 是什么？

在桌面端可用时，你可以演示一遍浏览器流程，让 Bot 记成技能草稿。录制有时长上限且不录麦克风。手机端不能 Teach。详见[Skills](/workbench/skills/)。

### 可以分享 Bot 吗？

可以导出为模板（公开链接或仅团队）。接收方得到的是副本，不会得到你的云电脑和登录。分享前去掉密钥与私密路径。Marketplace 导入同理。

### 删除 Bot 会怎样？

会移除该 Bot 的资料、对话和它拥有的例程，但共享电脑上的文件与登录不会自动消失。暂时不用时优先隐藏，并先暂停例程。

## 4. 关于文件与结果

### 一次能附多少文件？

桌面端一次最多 6 个附件。文档、图片、音频有大小上限，视频上限更高——具体数字以官方 [Files and results](https://docs.x.ai/grok-bot/files-and-results) 为准（本页不抄可能变动的字节数）。持久材料建议放在云电脑的 `/workspace`。

### Cloud Agent 的结果怎么拿回来？

官方说明支持把 Cloud Agent 产生的结果文件回传到对话或约定位置。开 PR、合并仍应遵守你的审批边界。见场景[Cloud Agent 开带预览的 PR](/scenarios/cloud-agent-pr/)。

## 5. 关于 Q&A

### 电脑连不上怎么办？

按破坏性从小到大：先 **Retry** 或重开对话，再重启应用，然后选 **Recover computer**，仍不行就用 **Settings → Computer** 里的 **Update Bot's Computer**，最后才用 **Reset**。恢复和更新会保留持久文件与登录；**Reset** 会回到上一次快照，可能丢失最近未同步的工作。手机路径见官方 troubleshooting。

### 登录走不完？

保持 Grok Bot 打开，确认浏览器显示 Cursor 登录成功，再手动切回应用；欢迎页再点 **Sign in**，或在 Settings 用 **Sign In with Cursor**。组织账号走 SSO。Legacy Privacy Mode 报错则先改 Cursor 数据设置。

### Bot 像卡住了？

看侧边栏与对话状态；打开电脑看是否在等页面、审批、登录或 CAPTCHA；发一句短重定向；需要结束就明确说停。同一屏幕上已有 computer-use 任务时，可能要等它结束或被改道后才能开新的。

### 例程没跑？

检查是否暂停、时间表与时区、上次 Test run 是否失败、审批是否过期、是否因长时间离开被询问后暂停。详见[Routines](/workbench/routines/)与[新手坑点](/faq/pitfalls/)。

延伸阅读： [新手坑点](/faq/pitfalls/) · [云电脑与接管](/start/computer/) · [安全与审批](/workbench/security/)
